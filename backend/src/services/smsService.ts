import twilio from "twilio";
import * as process from "node:process";
const TWILIO_PHONE_NUMBER = "+19785811921";
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendVerificationCode = async (to: string, code: string) => {
    try {
        const message = await client.messages.create({
            body: code,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        });

        console.log("Message SID: ", message.sid);
        return message;
    } catch (error) {
        console.error("Twilio error: ", error);
        throw error;
    }
};
