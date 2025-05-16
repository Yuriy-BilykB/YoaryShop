import twilio from "twilio";
import {config} from "../config/config";

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export const sendVerificationCode = async (to: string, code: string) => {
    try {
        const message = await client.messages.create({
            body: code,
            from: config.TWILIO_PHONE_NUMBER,
            to: to,
        });

        console.log("Message SID: ", message.sid);
        return message;
    } catch (error) {
        console.error("Twilio error: ", error);
        throw error;
    }
};
