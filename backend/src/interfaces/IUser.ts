export interface IUser {
    id: number;
    email: string;
    phone_number: string,
    password: string;
    first_name: string;
    last_name: string
    is_guest: boolean;
    created_at: Date;
}


