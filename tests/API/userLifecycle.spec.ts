import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import { UserApi } from "../../src/api/userApi";
import { DataGenerator } from "../../src/utils/dynamicDataGenerator";
import { User } from "../../src/model/user";

test.describe("User Lifecycle API", () => {

    let userApi: UserApi;
    let user: User;

    test.beforeEach(async ({ request }) => {

        const apiClient = new ApiClient(request);

        userApi = new UserApi(apiClient);

        user = DataGenerator.generateUser();

    });

    test("TA07 - TA09 User Lifecycle (Create → Verify → Delete)", async () => {

        // TA07 - Create Account
        const createResponse = await userApi.createAccount(user);

        expect(createResponse.responseCode).toBe(201);
        expect(createResponse.message).toBe("User created!");

        // TA08 - Get User Details By Email

        const getUserResponse = await userApi.getUserDetailByEmail(user.email);

        expect(getUserResponse.responseCode).toBe(200);

        expect(getUserResponse.user).toBeDefined();
        expect(getUserResponse.user.id).toEqual(expect.any(Number));
        expect(getUserResponse.user.id).toBeGreaterThan(0);

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
        const deleteResponse = await userApi.deleteAccount(
            user.email,
            user.password
        );

        expect(deleteResponse.responseCode).toBe(200);
        expect(deleteResponse.message).toBe("Account deleted!");

    });

});