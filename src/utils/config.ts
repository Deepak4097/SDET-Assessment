import dotenv from 'dotenv';

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL || "https://automationexercise.com",
    headless: process.env.CI === "true"
    ? true
    : process.env.HEADLESS === "true"
};