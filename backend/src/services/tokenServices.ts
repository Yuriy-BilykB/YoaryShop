import jwt from "jsonwebtoken";
import {ITokenPayload, ITokens} from "../interfaces/ITokens";
import * as process from "node:process";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;


export class tokenServices {
    static createTokens(payload: ITokenPayload): ITokens {
        const accessToken: string = jwt.sign(
            payload,
            ACCESS_SECRET,
            {expiresIn: "30m"}
        );
        const refreshToken: string = jwt.sign(
            payload,
            REFRESH_SECRET,
            {expiresIn: "30d",}
        );
        return {
            accessToken,
            refreshToken,
        };
    }
    static validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    static validateRefreshToken(refreshToken: string): ITokenPayload | null {
        try {
            const userData = jwt.verify(refreshToken, REFRESH_SECRET) as ITokenPayload;
            return userData;
        } catch (error) {
            return null;
        }
    }

}
