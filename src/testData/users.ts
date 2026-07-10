import { LoginUser } from "../model/LoginUser";

export const USERS: Record<string, LoginUser> = {

    VALID_USER: {
        email: "vikram123@gmail.com",
        password: "12345",
        name: "Vikram"
    },

    INVALID_USER: {
        email: "invalid@gmail.com",
        password: "wrong123"
    }

};

export const INVALID_PASSWORD = "WrongPassword123";