export interface UserInterface{
    email: string;
    authStatus: boolean;
    message: string;
}

export class User implements UserInterface{
    email: string = "";
    authStatus: boolean = false;
    message: string = "";

    fromJson(userJson: UserInterface){
        this.email = userJson.email;
        this.authStatus = userJson.authStatus;
        this.message = userJson.message;
        return this;
    }
}