import {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/User";
import {AuthServices} from "../services/authServices";
import {Op} from "sequelize";
import {tokenServices} from "../services/tokenServices";
import UserDto from "../dto/userDto";
import bcrypt from "bcryptjs";
import {sendVerificationCode} from "../services/smsService";
import {redisClient} from "../redis/redisClient";
import CartRepo from "../repositories/cartRepo";

class AuthController {
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {firstName, lastName, phoneNumber, email, password} = req.body;
            if (!firstName || !lastName || !phoneNumber || !email || !password) {
                res.status(400).json("User Data not found");
                return;
            }

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            await redisClient.setEx(`verify:${phoneNumber}`, 60, JSON.stringify({
                action: "register",
                firstName,
                lastName,
                email,
                password,
                code: verificationCode
            }));

            await sendVerificationCode(phoneNumber, verificationCode);

            const userAlreadyRegistered = await UserModel.findAll({
                where: {
                    [Op.or]: [{phone_number: phoneNumber}, {email}]
                }
            });

            if (userAlreadyRegistered.length > 0) {
                res.status(401).json("User with this email or number already registered");
                return;
            }

            res.status(200).json({message: "Verification code sent"});
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {identifier, password} = req.body;
            const {session_id} = req.cookies;
            const isEmail = identifier.includes("@");
            if (isEmail) {
                let user = await UserModel.findOne({where: {email: identifier}});
                if (!user) {
                    res.status(400).json("This phone number or email is not registered");
                    return;
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(400).json("Invalid email or password");
                    return;
                }
                const payload = new UserDto(user).toJSON();
                const tokens = tokenServices.createTokens(payload);

                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({payload, accessToken: tokens.accessToken});
                return
            } else {
                const phoneNumber = identifier;
                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                await redisClient.setEx(`verify:${phoneNumber}`, 60, JSON.stringify({
                    action: "login",
                    phoneNumber: phoneNumber,
                    code: verificationCode
                }));
                await sendVerificationCode(phoneNumber, verificationCode);
                res.status(200).json({message: "Verification code sent"});
            }

        } catch (error) {
            next(error);
        }
    }

    async verifyCode(req: Request, res: Response, next: NextFunction) {
        try {
            const {phoneNumber, verificationCode} = req.body;
            const {session_id} = req.cookies;
            const data = await redisClient.get(`verify:${phoneNumber}`);
            if (!data) {
                res.status(400).json("Verification code expired or invalid");
                return;
            }
            const parsed = JSON.parse(data);
            if (parsed.code !== verificationCode) {
                res.status(400).json("Invalid verification code");
                return;
            }
            if (parsed.action === "register") {
                const password_hash = await AuthServices.hashPassword(parsed.password);
                const createdUser = await UserModel.create({
                    first_name: parsed.firstName,
                    last_name: parsed.lastName,
                    phone_number: phoneNumber,
                    email: parsed.email,
                    password: password_hash,
                    is_guest: false,
                    created_at: new Date()
                });
                await CartRepo.mergeCartAfterLogin(createdUser.id, session_id)

                const payload = new UserDto(createdUser).toJSON();
                const tokens = tokenServices.createTokens(payload);

                if (!tokens) {
                    throw new Error("No tokens provided");
                }

                await redisClient.del(`verify:${phoneNumber}`);

                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                res.status(201).json({payload, accessToken: tokens.accessToken});

            } else if (parsed.action === "login") {
                const user = await UserModel.findOne({where: {phone_number: phoneNumber}});
                if (!user) {
                    res.status(400).json("User not found");
                    return;
                }
                const payload = new UserDto(user).toJSON();
                const tokens = tokenServices.createTokens(payload);
                await redisClient.del(`verify:${phoneNumber}`);
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({payload, accessToken: tokens.accessToken});
            }
        } catch (error) {
            next(error);
        }
    }


    async authMe(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                res.status(401).json("Token not found")
                return;
            }
            const userData = tokenServices.validateRefreshToken(refreshToken);
            if (!userData) {
                res.status(401).json("Invalid Token")
                return;
            }
            const user = await UserModel.findByPk(userData.id);
            if (!user) {
                res.status(400).json("User not found");
                return;
            }
            const payload = new UserDto(user);
            const tokens = tokenServices.createTokens(payload.toJSON());
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({payload, accessToken: tokens.accessToken});
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie("refreshToken", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                expires: new Date(0),
            });

            res.status(200).json({message: "Logged out successfully"});
        } catch (error) {
            next(error);
        }
    }

}

export default new AuthController();