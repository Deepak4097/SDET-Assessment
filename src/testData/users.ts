import { LoginUser } from "../model/LoginUser";

export const USERS: {
    VALID_USER: LoginUser;
    INVALID_USER: LoginUser;
} ={
    VALID_USER: {
        email: "vikram123@gmail.com",
        password: "12345",
        name: "vikram",
    },

    INVALID_USER: {
        email: "invalid@gmail.com",
        password: "wrong123",
    },

    
};