import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import { ENDPOINTS } from "../../src/api/endpoints";
import { DataGenerator } from "../../src/utils/dynamicDataGenerator";
import { User } from "../../src/model/User";

test.describe("User Lifecycle API", () => {

    let apiClient: ApiClient;
    let user: User;

    test.beforeEach(({ request }) => {
        apiClient = new ApiClient(request);
        user = DataGenerator.generateUser();
    });

    test("TA07 - TA09 User Lifecycle (Create → Verify → Delete)", async () => {
        // TA07 - Create Account
        const createResponse = await apiClient.post(ENDPOINTS.CREATE_ACCOUNT, {
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
            mobile_number: user.mobile_number,
        });

        expect(createResponse.responseCode).toBe(201);
        expect(createResponse.message).toBe("User created!");

        // TA08 - Get User Details By Email
        const getUserResponse = await apiClient.get(ENDPOINTS.GET_USER_DETAIL, {
            email: user.email,
        });
        expect(getUserResponse.responseCode).toBe(200);
        expect(getUserResponse.user.id).toEqual(expect.any(Number));

        // Personal Details
        expect(getUserResponse.user.name).toBe(user.name);
        expect(getUserResponse.user.email).toBe(user.email);
        expect(getUserResponse.user.title).toBe(user.title);

        // Name Details
        expect(getUserResponse.user.first_name).toBe(user.firstname);
        expect(getUserResponse.user.last_name).toBe(user.lastname);

        // DOB
        expect(getUserResponse.user.birth_day).toBe(user.birth_date);
        expect(getUserResponse.user.birth_month).toBe(user.birth_month);
        expect(getUserResponse.user.birth_year).toBe(user.birth_year);

        // Company & Address
        expect(getUserResponse.user.company).toBe(user.company);
        expect(getUserResponse.user.address1).toBe(user.address1);
        expect(getUserResponse.user.address2).toBe(user.address2);

        // Location
        expect(getUserResponse.user.country).toBe(user.country);
        expect(getUserResponse.user.state).toBe(user.state);
        expect(getUserResponse.user.city).toBe(user.city);
        expect(getUserResponse.user.zipcode).toBe(user.zipcode);
        
        // TA09 - Delete Account
        const deleteResponse = await apiClient.delete(ENDPOINTS.DELETE_ACCOUNT, {
            email: user.email,
            password: user.password,
        });

        expect(deleteResponse.responseCode).toBe(200);
        expect(deleteResponse.message).toBe("Account deleted!");

        //try to access deleted accout with getemail, check 404

        const verifyUserDeletion = await apiClient.get(ENDPOINTS.GET_USER_DETAIL, {
            email: user.email,

        });
        expect(verifyUserDeletion.responseCode).toBe(404);
        expect(verifyUserDeletion.message).toBe('Account not found with this email, try another email!');
    });

});