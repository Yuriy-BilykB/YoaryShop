export interface IUser {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface IUserInfo {
    payload: {
        id: number;
        email: string;
        phone_number: string,
        firstName: string;
        lastName: string;
    },
    accessToken: string
}