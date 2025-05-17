import twilio from "twilio";
import * as process from "node:process";
const TWILIO_PHONE_NUMBER = "+19785811921";
const client = twilio("AC36e127d30d450b9e0212592c8b252739", "324b8e206f53420bb1834ead9b6a05d0");

export const sendVerificationCode = async (to: string, code: string) => {
    try {
        const message = await client.messages.create({
            body: code,
            from: TWILIO_PHONE_NUMBER,
            to: to,
        });

        console.log("Message SID: ", message.sid);
        return message;
    } catch (error) {
        console.error("Twilio error: ", error);
        throw error;
    }
};
