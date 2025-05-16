import { IUser } from "../interfaces/IUser";

export default class UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone_number: string
    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.phone_number = user.phone_number;
    }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phone_number: this.phone_number
        };
    }
}
