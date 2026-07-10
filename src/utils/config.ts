import dotenv from 'dotenv';

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL || '',
    apiTimeout: Number(process.env.API_TIMEOUT) || 30000,
    headless: process.env.HEADLESS === 'true'
};