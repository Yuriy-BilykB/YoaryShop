import {NextFunction, Request, Response} from "express";
import {tokenServices} from "../services/tokenServices";
import {IUser} from "../interfaces/IUser";
interface IUserRequest extends Request {
    user?: IUser;
}
export const authMiddleware = (req: IUserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header found");
        res.sendStatus(401)
        return;
    }

    const token = authHeader.split(' ')[1];
    const userData = tokenServices.validateAccessToken(token);

    if (!userData) {
        res.sendStatus(403);
        return
    }else {
        req.user = userData as IUser;
        next();
    }
};
