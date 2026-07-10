import { ApiClient } from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export class LoginApi {

    constructor(private apiClient: ApiClient) {}

    async verifyLogin(email: string, password: string) {

        return await this.apiClient.post(
            ENDPOINTS.VERIFY_LOGIN,
            {
                email,
                password,
            }
        );

    }

    async verifyLoginWithoutPassword(email: string) {

        return await this.apiClient.post(
            ENDPOINTS.VERIFY_LOGIN,
            {
                email,
            }
        );

    }

}