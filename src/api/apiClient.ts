import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class ApiClient {

    private readonly formHeader = {
        "Content-Type": "application/x-www-form-urlencoded",
    };

    constructor(private request: APIRequestContext) { }

    async get(endpoint: string, params?: Record<string, string>) {
        const query = params
            ? `?${new URLSearchParams(params).toString()}`
            : "";

        const response = await this.request.get(`${endpoint}${query}`);

        this.validateResponse(response);

        return await response.json();
    }

    async post(endpoint: string, payload: Record<string, string>) {
        const response = await this.request.post(endpoint, {
            headers: this.formHeader,
            data: new URLSearchParams(payload).toString(),
        });

        this.validateResponse(response);
        return await response.json();
    }

    async delete(endpoint: string, payload: Record<string, string>) {
        const response = await this.request.delete(endpoint, {
            headers: this.formHeader,
            data: new URLSearchParams(payload).toString(),
        });

        this.validateResponse(response);
        return await response.json();
    }

    private validateResponse(response: APIResponse) {
        expect(response.ok()).toBeTruthy();
    }
}