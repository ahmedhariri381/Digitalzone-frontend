import axios from "axios";

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
    meta_description?: string;
}

export async function searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return [];

    try {
        const res = await axios.get(`http://localhost:5000/api/products/search`, {
            params: { q: query },
            withCredentials: true,
        });
        return res.data.products || [];
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
}
