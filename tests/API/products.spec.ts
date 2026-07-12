import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import { ENDPOINTS } from "../../src/api/endpoints";
import { PRODUCTS } from "../../src/testData/products";

test.describe("Products API", () => {

    let apiClient: ApiClient;

    test.beforeEach(({ request }) => {
        apiClient = new ApiClient(request);
    });

    test("TA01 - Get Products List", async () => {
        const response = await apiClient.get(ENDPOINTS.PRODUCTS);
        expect(response.responseCode).toBe(200);
        expect(response.products).toBeDefined();
        expect(Array.isArray(response.products)).toBeTruthy();
        expect(response.products.length).toBeGreaterThan(0);
    });

    test("TA02 - Get Brands List", async () => {
        const response = await apiClient.get(ENDPOINTS.BRANDS);
        expect(response.responseCode).toBe(200);
        expect(response.brands).toBeDefined();
        expect(Array.isArray(response.brands)).toBeTruthy();
        expect(response.brands.length).toBeGreaterThan(0);
    });

    test("TA03 - Search Product", async () => {
        const response = await apiClient.post(ENDPOINTS.SEARCH_PRODUCT, {
            search_product: PRODUCTS.SEARCH_KEYWORD,
        });
        expect(response.responseCode).toBe(200);
        expect(response.products).toBeDefined();
        expect(response.products.length).toBeGreaterThan(0);

        const matchingProducts = response.products.filter((product: any) =>
            product.name
                .toLowerCase()
                .includes(PRODUCTS.SEARCH_KEYWORD.toLowerCase())
        );
        expect(matchingProducts.length).toBeGreaterThan(0);
    });
});