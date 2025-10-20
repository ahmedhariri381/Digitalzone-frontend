"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Category {
    id: number;
    name: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    image_url?: string;
}

interface Props {
    onCategorySelect: (categoryId: number | null) => void;
    selectedCategoryId: number | null;
}

export default function CategoriesSection({ onCategorySelect, selectedCategoryId }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 6;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                setCategories(res.data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleClick = (categoryId: number) => {
        const newSelection = selectedCategoryId === categoryId ? null : categoryId;
        onCategorySelect(newSelection);

        // Smooth scroll to products section
        const productsEl = document.getElementById("products");
        if (productsEl) {
            productsEl.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (loading)
        return (
            <p className="text-center mt-10 text-lg text-gray-600">
                Loading categories...
            </p>
        );

    const indexOfLast = currentPage * categoriesPerPage;
    const indexOfFirst = indexOfLast - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-3xl md:text-3xl font-normal text-center mb-16 text-gray-900 tracking-tight">
                    Browse Our <span className="text-purple-600">Categories</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentCategories.map((category) => {
                        const imageUrl = category.image_url
                            ? `http://localhost:5000${category.image_url}`
                            : "/placeholder.png";

                        const isActive = selectedCategoryId === category.id;

                        return (
                            <div
                                key={category.id}
                                className={`group bg-white rounded-2xl border ${isActive
                                        ? "border-purple-500 shadow-lg"
                                        : "border-gray-100 shadow-md hover:shadow-xl"
                                    } transition-all duration-300 flex flex-col overflow-hidden`}
                            >
                                <div className="relative w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">{category.meta_title}</p>
                                    <p className="text-gray-600 text-sm mb-5 flex-1 line-clamp-3">
                                        {category.meta_description}
                                    </p>

                                    <div className="flex flex-col gap-2 mt-auto">
                                        <Button
                                            onClick={() => handleClick(category.id)}
                                            className={`rounded-full text-sm py-2 font-medium shadow-md transition-all ${isActive
                                                    ? "bg-purple-700 text-white hover:bg-purple-800"
                                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                                                }`}
                                        >
                                            {isActive ? "Show All Products" : "View Products"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-4">
                        <Button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="rounded-full px-6 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                            Previous
                        </Button>
                        <span className="font-medium text-gray-700 text-sm">
                            Page <span className="text-purple-600">{currentPage}</span> of {totalPages}
                        </span>
                        <Button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="rounded-full px-6 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
