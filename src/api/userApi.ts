import { ApiClient } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { User } from "../model/user";

export class UserApi {

    constructor(private apiClient: ApiClient) {}

    async createAccount(user: User) {

        return await this.apiClient.post(
            ENDPOINTS.CREATE_ACCOUNT,
            {
                name: user.name,
                email: user.email,
                password: user.password,
                title: user.title,
                birth_date: user.birth_date,
                birth_month: user.birth_month,
                birth_year: user.birth_year,
                firstname: user.firstname,
                lastname: user.lastname,
                company: user.company,
                address1: user.address1,
                address2: user.address2,
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobile_number
            }
        );

    }

    async getUserDetailByEmail(email: string) {

        return await this.apiClient.get(
            ENDPOINTS.GET_USER_DETAIL,
            {
                email
            }
        );

    }

    async deleteAccount(email: string, password: string) {

        return await this.apiClient.delete(
            ENDPOINTS.DELETE_ACCOUNT,
            {
                email,
                password
            }
        );

    }

}