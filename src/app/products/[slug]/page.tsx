"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import RelatedProducts from "@/components/sections/RelatedProducts";
import { useCart } from "@/context/CartContext";

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    display: string;
    description: string;
    meta_title: string;
    meta_description: string;
    price: number;
    image: string;
    gallery: string[];
    category_id: number;
}

export default function ProductDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const { addToCart } = useCart(); // ✅ Add this line to use cart context
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/slug/${slug}`);
                setProduct(res.data.product);
                setMainImage(res.data.product.image);
            } catch (error) {
                console.error("Failed to load product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    // 🛒 Handle Add to Cart + Navigate
    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: `http://localhost:5000/uploads/products/${product.image}`,
            slug: product.slug,
            quantity: 1,
        });
        router.push("/cart"); // ✅ Navigate to cart page
    };

    if (loading) return <p className="text-center mt-10 text-lg">Loading product...</p>;
    if (!product) return <p className="text-center mt-10 text-lg">Product not found.</p>;

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Images */}
                <div className="flex flex-col">
                    <div className="relative w-full h-[500px] bg-white overflow-hidden">
                        <Image
                            src={`http://localhost:5000/uploads/products/${mainImage}`}
                            alt={product.name}
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Gallery */}
                    {product.gallery?.length > 0 && (
                        <div className="flex gap-4 mt-4 overflow-x-auto py-2 scrollbar-hide">
                            {[product.image, ...product.gallery].map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`flex-shrink-0 w-28 h-28 cursor-pointer transition-transform duration-300 ${mainImage === img ? "scale-105 border-2 border-purple-600" : ""
                                        } rounded-lg overflow-hidden`}
                                >
                                    <Image
                                        src={`http://localhost:5000/uploads/products/${img}`}
                                        alt={`Gallery ${i}`}
                                        width={112}
                                        height={112}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-purple-600 font-semibold text-lg">{product.meta_title}</p>
                        <p className="text-gray-500 text-sm line-clamp-2">{product.meta_description}</p>
                        <p className="text-3xl font-extrabold text-purple-700 mt-2">${product.price}</p>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-gray-700">
                            <p><strong>Type:</strong> {product.type}</p>
                            <p><strong>CPU:</strong> {product.cpu}</p>
                            <p><strong>RAM:</strong> {product.ram}</p>
                            <p><strong>Storage:</strong> {product.storage}</p>
                            <p><strong>GPU:</strong> {product.gpu}</p>
                            <p><strong>Display:</strong> {product.display}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto"
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/")}
                            className="flex items-center justify-center gap-2 border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-md text-sm font-semibold w-full sm:w-auto transition-all duration-300"
                        >
                            <ArrowLeft size={18} /> Back to Shop
                        </Button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {product && (
                <RelatedProducts
                    categoryId={product.category_id}
                    currentProductId={product.id}
                />
            )}
        </main>
    );
}
