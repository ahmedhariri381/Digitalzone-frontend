"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, DollarSign, Play } from "lucide-react";

export default function CheckoutPage() {
    const { cartItems, clearCart, getTotal } = useCart();
    const totalPrice = getTotal();
    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // TODO: Integrate Stripe / PayPal / Bank Transfer
        setTimeout(() => {
            alert(`Payment via ${paymentMethod} successful!`);
            clearCart();
            setLoading(false);
        }, 1000);
    };

    if (cartItems.length === 0)
        return (
            <p className="text-center mt-10 text-lg">
                Your cart is empty. Add products before checkout.
            </p>
        );

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

            {/* Cart Summary */}
            <section className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-3">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4 font-bold text-lg">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="flex flex-col gap-3">
                    {/* Credit/Debit Card */}
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="accent-purple-600"
                        />
                        <CreditCard size={20} />
                        Credit / Debit Card
                    </label>

                    {/* PayPal (using Play icon as placeholder) */}
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                            className="accent-purple-600"
                        />
                        <Play size={20} />
                        PayPal
                    </label>

                    {/* Cash on Delivery */}
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="accent-purple-600"
                        />
                        <DollarSign size={20} />
                        Cash on Delivery
                    </label>

                    {/* Bank Transfer */}
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="bank"
                            checked={paymentMethod === "bank"}
                            onChange={() => setPaymentMethod("bank")}
                            className="accent-purple-600"
                        />
                        <DollarSign size={20} />
                        Bank Transfer
                    </label>
                </div>
            </section>

            {/* Checkout Button */}
            <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold transition-all duration-300"
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </main>
    );
}
