"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Banner {
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

const banners: Banner[] = [
    {
        image: "/banners/banner1.jpg",
        title: "High-Performance Laptops",
        subtitle: "Unleash power and precision with RTX 40-series laptops.",
        ctaText: "Shop Laptops",
        ctaLink: "#products",
    },
    {
        image: "/banners/banner2.jpg",
        title: "Powerful Desktops",
        subtitle: "Work, create, and play with unmatched speed.",
        ctaText: "Shop Desktops",
        ctaLink: "#products",
    },
    {
        image: "/banners/banner3.jpg",
        title: "Next-Gen Consoles",
        subtitle: "Redefine your gaming experience with next-gen performance.",
        ctaText: "Shop Consoles",
        ctaLink: "#products",
    },
];

export default function CarouselBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-screen h-[500px] md:h-[650px] overflow-hidden bg-black">
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-105 z-0"
                        }`}
                >
                    <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-24">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                                {banner.title}
                            </h2>
                            <p className="mt-4 text-lg md:text-2xl text-gray-200 font-light drop-shadow-lg">
                                {banner.subtitle}
                            </p>
                            <Button
                                asChild
                                className="mt-8 px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-lg font-semibold shadow-xl rounded-full transition-all duration-300 hover:scale-105"
                            >
                                <a href={banner.ctaLink}>{banner.ctaText}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                ? "bg-purple-600 w-5 h-5 shadow-lg shadow-purple-500/50 scale-110"
                                : "bg-white/40 hover:bg-white/80 w-3 h-3"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
