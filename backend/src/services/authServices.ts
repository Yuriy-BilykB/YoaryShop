import bcrypt from "bcryptjs";
export class AuthServices {
    static async hashPassword (password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;

    }
}
