import { ApiClient } from "./apiClient";
import { ENDPOINTS } from "./endpoints";


export class ProductApi {

    constructor(private apiClient: ApiClient) {}

    async getProductsList() {
        return await this.apiClient.get(ENDPOINTS.PRODUCTS);
    }

    async getBrandsList() {
        return await this.apiClient.get(ENDPOINTS.BRANDS);
    }

    async searchProduct(productName: string) {

        return await this.apiClient.post(
            ENDPOINTS.SEARCH_PRODUCT,
            {
                search_product: productName
            }
        );
    }

}