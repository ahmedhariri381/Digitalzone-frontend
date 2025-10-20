"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: number;
    image: string;
    category_id: number;
}

interface RelatedProductsProps {
    categoryId: number;
    currentProductId: number;
}

export default function RelatedProducts({
    categoryId,
    currentProductId,
}: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products", {
                    withCredentials: true,
                });

                const related = res.data.products
                    .filter(
                        (p: Product) => p.category_id === categoryId && p.id !== currentProductId
                    )
                    .slice(0, 6); // Show up to 6 related products

                setProducts(related);
            } catch (error) {
                console.error("Error fetching related products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelated();
    }, [categoryId, currentProductId]);

    if (loading) return <p className="text-center mt-6">Loading related products...</p>;
    if (!products.length) return null;

    return (
        <section className="py-16 bg-gray-50 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-normal text-center mb-10">
                    Related <span className="text-purple-600">Products</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group"
                        >
                            {/* Product Image */}
                            <div className="relative w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={`http://localhost:5000/uploads/products/${product.image}`}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-purple-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-purple-600 font-semibold text-lg mb-4">
                                    ${product.price}
                                </p>

                                <div className="flex flex-col gap-2 mt-auto">
                                    <Link href={`/products/${product.slug}`}>
                                        <Button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white w-full rounded-xl text-sm py-2 font-semibold transition-all duration-300">
                                            View Details
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 w-full rounded-xl text-sm py-2 font-semibold transition-all duration-300"
                                    >
                                        <ShoppingCart size={16} /> Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
