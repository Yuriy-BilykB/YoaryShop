import dotenv from "dotenv";
dotenv.config();
console.log("TWILIO_ACCOUNT_SID from env:", process.env.TWILIO_ACCOUNT_SID);
interface Config {
    FRONTEND_URL: string;

    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ACCESS_TOKEN_EXPIRE_TIME: string;
    REFRESH_TOKEN_EXPIRE_TIME: string;

    TWILIO_ACCOUNT_SID: string
    TWILIO_AUTH_TOKEN: string
    TWILIO_PHONE_NUMBER: string

    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;

}

export const config: Config = {
    FRONTEND_URL: process.env.FRONTEND_URL!,
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ACCESS_TOKEN_EXPIRE_TIME: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h" as string,
    REFRESH_TOKEN_EXPIRE_TIME: process.env.REFRESH_TOKEN_EXPIRE_TIME || "30d",

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER!,

    CLOUD_NAME: process.env.CLOUD_NAME!,
    CLOUD_API_KEY: process.env.API_KEY!,
    CLOUD_API_SECRET: process.env.API_SECRET!,
};
