import {IUserInfo} from "@/interfaces/IUser";

let sessionUpdater = {
    login: () => {},
    logout: () => {},
    addUserInfo: (info: IUserInfo) => {
        console.log(info);
    }
}
export const setSessionUpdater = (methods: typeof sessionUpdater) => {
    sessionUpdater = methods;
};

export const getSessionUpdater = () => sessionUpdater;
