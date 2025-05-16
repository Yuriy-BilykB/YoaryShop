import {NextFunction, Request, Response} from "express";
import {tokenServices} from "../services/tokenServices";
import {IUser} from "../interfaces/IUser";

interface IUserRequest extends Request {
    user?: IUser;
}

export const checkAuthOptional = (req: IUserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        next();
        return;
    }
    const token = authHeader.split(' ')[1];
    const userData = tokenServices.validateAccessToken(token); // уточнив тип
    if (userData) {
        req.user = userData as IUser;
        next();
    } else {
        next();
    }
};
