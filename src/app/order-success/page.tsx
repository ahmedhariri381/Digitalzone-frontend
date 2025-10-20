"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
            <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your items will be shipped soon.
            </p>
            <Button
                onClick={() => router.push("/")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
            >
                Continue Shopping
            </Button>
        </div>
    );
}
