"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: string;
    meta_title: string;
    meta_description: string;
    image: string;
    category_id: number;
}

interface Props {
    selectedCategoryId: number | null;
}

export default function ProductsSection({ selectedCategoryId }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const { addToCart } = useCart();
    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", {
                withCredentials: true,
            });
            let allProducts: Product[] = res.data.products;

            if (selectedCategoryId) {
                allProducts = allProducts.filter(
                    (p) => p.category_id === selectedCategoryId
                );
            }

            setProducts(allProducts);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProducts();
    }, [selectedCategoryId]);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: `http://localhost:5000/uploads/products/${product.image}`,
            slug: product.slug,
            quantity: 1,
        });
        router.push("/cart");
    };

    // Pagination logic
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading)
        return (
            <p className="text-center mt-12 text-lg text-gray-600">
                Loading products...
            </p>
        );

    return (
        <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-normal text-center mb-16 text-gray-900 tracking-tight">
                    {selectedCategoryId ? (
                        <>
                            Showing <span className="text-purple-600">Filtered</span> Products
                        </>
                    ) : (
                        <>
                            Discover Our <span className="text-purple-600">Products</span>
                        </>
                    )}
                </h2>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 overflow-hidden flex flex-col group"
                        >
                            <div className="relative w-full h-72 bg-white flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={`http://localhost:5000/uploads/products/${product.image}`}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-purple-700 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-purple-600 font-bold text-lg mb-2">
                                    ${product.price}
                                </p>
                                <p className="text-gray-700 font-medium text-sm mb-1 truncate">
                                    {product.meta_title}
                                </p>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                                    {product.meta_description}
                                </p>

                                <div className="flex flex-col gap-2 mt-auto">
                                    <Button
                                        asChild
                                        className="bg-purple-600 hover:bg-purple-700 text-white w-full rounded-xl text-sm py-2 font-semibold shadow-md transition-all duration-300"
                                    >
                                        <a href={`/products/${product.slug}`}>View Details</a>
                                    </Button>
                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        variant="outline"
                                        className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 w-full rounded-xl text-sm py-2 font-semibold transition-all duration-300"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                        <Button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="rounded-full border-purple-500 text-purple-600 hover:bg-purple-50 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`rounded-full w-10 h-10 text-sm font-semibold transition-all duration-300 ${currentPage === i + 1
                                        ? "bg-purple-600 text-white"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-purple-100"
                                    }`}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <Button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="rounded-full border-purple-500 text-purple-600 hover:bg-purple-50 disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
