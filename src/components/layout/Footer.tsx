"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "#products" }, // ← تعديل للتمرير
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const handleNavClick = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.location.href = href;
        }
    };

    return (
        <footer className="w-full bg-white shadow-inner mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">

                {/* Logo + Contact Info */}
                <div className="flex flex-col gap-4 items-center md:items-start">
                    <Link
                        href="/"
                        className="text-2xl font-[BrunoAce] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
                    >
                        Digitalzone
                    </Link>
                    <div className="flex flex-col gap-2 text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>Damascus - Syria</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            <span>+963 959 047 514</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            <span>ahmedhariri24@gmail.com</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 className="font-semibold text-gray-800">Quick Links</h3>
                    {navItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="text-gray-600 hover:text-purple-600 transition bg-transparent border-none cursor-pointer text-left w-full"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 className="font-semibold text-gray-800">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                        <Button variant="ghost" className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                            <Facebook />
                        </Button>
                        <Button variant="ghost" className="p-2 text-blue-400 hover:bg-blue-100 rounded-full">
                            <Twitter />
                        </Button>
                        <Button variant="ghost" className="p-2 text-pink-500 hover:bg-pink-100 rounded-full">
                            <Instagram />
                        </Button>
                        <Button variant="ghost" className="p-2 text-blue-700 hover:bg-blue-100 rounded-full">
                            <Linkedin />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="border-t border-gray-200"></div>
            </div>

            {/* Copyright */}
            <div className="text-center py-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Digitalzone. All rights reserved.
            </div>
        </footer>
    );
}
