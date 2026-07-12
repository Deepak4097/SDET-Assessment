import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import { ENDPOINTS } from "../../src/api/endpoints";
import { USERS } from "../../src/testData/users";

test.describe("Login API", () => {

    let apiClient: ApiClient;

    test.beforeEach(({ request }) => {
        apiClient = new ApiClient(request);
    });

    test("TA04 - Verify Login with Valid Credentials", async () => {
        const response = await apiClient.post(ENDPOINTS.VERIFY_LOGIN, {
            email: USERS.VALID_USER.email,
            password: USERS.VALID_USER.password,
        });
        expect(response.responseCode).toBe(200);
        expect(response.message).toBe("User exists!");
    });

    test("TA05 - Verify Login with Invalid Credentials", async () => {
        const response = await apiClient.post(ENDPOINTS.VERIFY_LOGIN, {
            email: USERS.INVALID_USER.email,
            password: USERS.INVALID_USER.password,
        });
        expect(response.responseCode).toBe(404);
        expect(response.message).toBe("User not found!");
    });

    test("TA06 - Verify Login without Password", async () => {
        const response = await apiClient.post(ENDPOINTS.VERIFY_LOGIN, {
            email: USERS.VALID_USER.email,
        });
        expect(response.responseCode).toBe(400);
        expect(response.message).toContain("email or password parameter is missing");
    });
});