"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from "lucide-react";

export default function CartPage() {
    const { cartItems = [], removeFromCart, clearCart } = useCart() || {};
    const router = useRouter();

    const total = (cartItems || []).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-normal text-center text-gray-900 mb-10 flex justify-center items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-purple-600" />
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                        <p className="text-gray-600 text-lg mb-6">
                            Your cart is currently empty.
                        </p>
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg shadow-sm transition-transform hover:scale-105"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-5 last:border-none"
                                >
                                    <div className="flex items-center space-x-5 w-full">
                                        <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h2>
                                            <p className="text-purple-600 font-medium text-sm mt-1">
                                                ${item.price.toFixed(2)}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => removeFromCart(item.id)}
                                        className="mt-4 sm:mt-0 border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                                    Order Summary
                                </h2>

                                <div className="flex justify-between mb-3 text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between mb-3 text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>

                                <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4 border-t pt-3">
                                    <span>Total</span>
                                    <span className="text-purple-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">
                                <Button
                                    onClick={() => router.push("/checkout")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3 rounded-xl text-lg font-medium shadow-sm transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" /> Proceed to Checkout
                                </Button>
                                <Button
                                    onClick={clearCart}
                                    variant="outline"
                                    className="w-full py-3 rounded-xl text-gray-700 border-gray-300 hover:bg-gray-100"
                                >
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
