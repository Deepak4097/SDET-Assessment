import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import { LoginApi } from "../../src/api/loginApi";

test.describe("Login API", () => {

    let loginApi: LoginApi;

    const VALID_USER = {
        email: "vikram123@gmail.com",
        password: "12345",
    };

    const INVALID_USER = {
        email: "invalid@gmail.com",
        password: "invalid123",
    };

    test.beforeEach(async ({ request }) => {

        const apiClient = new ApiClient(request);

        loginApi = new LoginApi(apiClient);

    });

    test("TA04 - Verify Login with Valid Credentials", async () => {

        const response = await loginApi.verifyLogin(
            VALID_USER.email,
            VALID_USER.password
        );

        expect(response.responseCode).toBe(200);
        expect(response.message).toBe("User exists!");

    });

    test("TA05 - Verify Login with Invalid Credentials", async () => {

        const response = await loginApi.verifyLogin(
            INVALID_USER.email,
            INVALID_USER.password
        );

        expect(response.responseCode).toBe(404);
        expect(response.message).toBe("User not found!");

    });

    test("TA06 - Verify Login without Password", async () => {

        const response = await loginApi.verifyLoginWithoutPassword(
            VALID_USER.email
        );

        expect(response.responseCode).toBe(400);
        expect(response.message)
            .toContain("email or password parameter is missing");

    });

});