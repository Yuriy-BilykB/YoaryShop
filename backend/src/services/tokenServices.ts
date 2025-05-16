import jwt from "jsonwebtoken";
import {ITokenPayload, ITokens} from "../interfaces/ITokens";
import {config} from "../config/config";
export class tokenServices {
    static createTokens(payload: ITokenPayload): ITokens {
        const accessToken: string = jwt.sign(
            payload,
            config.JWT_ACCESS_SECRET,
            {expiresIn: "30m"}
        );
        const refreshToken: string = jwt.sign(
            payload,
            config.JWT_REFRESH_SECRET,
            {expiresIn: "30d",}
        );
        return {
            accessToken,
            refreshToken,
        };
    }
    static validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    static validateRefreshToken(refreshToken: string): ITokenPayload | null {
        try {
            const userData = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as ITokenPayload;
            return userData;
        } catch (error) {
            return null;
        }
    }

}
