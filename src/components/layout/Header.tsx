"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ import router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { searchProducts, Product } from "@/lib/searchProduct";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const router = useRouter(); // ✅ initialize router

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "#products" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const handleNavClick = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                const headerOffset = 80; // height of your fixed header
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        } else {
            router.push(href);
        }
    };

    // Debounced search
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (searchTerm.trim()) {
                const data = await searchProducts(searchTerm);
                setResults(data);
            } else {
                setResults([]);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    const handleResultClick = () => {
        setSearchTerm("");
        setResults([]);
        setSearchOpen(false);
    };

    return (
        <header className="w-full bg-white shadow-lg fixed top-0 z-50">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between px-8 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-[BrunoAce] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform duration-300"
                >
                    Digitalzone
                </Link>

                {/* Nav Links */}
                <nav className="flex gap-8 text-black font-semibold">
                    {navItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="relative group bg-transparent border-none cursor-pointer"
                        >
                            {item.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </button>
                    ))}
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-4 relative">
                    {/* Search */}
                    <div className="relative flex items-center">
                        {searchOpen && (
                            <Input
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="absolute right-12 w-64 bg-gray-100 shadow-md rounded-lg transition-transform duration-300 transform scale-100"
                            />
                        )}
                        <Button
                            variant="ghost"
                            className="text-blue-600 hover:bg-blue-100 rounded-full p-2 transition"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search />
                        </Button>

                        {results.length > 0 && searchOpen && (
                            <div className="absolute top-full right-12 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                {results.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/products/${p.slug}`}
                                        onClick={handleResultClick}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 truncate"
                                    >
                                        {p.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Login */}
                    <Button variant="ghost" className="text-green-600 hover:bg-green-100 rounded-full p-2">
                        <User />
                    </Button>

                    {/* Cart */}
                    <Button
                        variant="ghost"
                        className="text-orange-600 hover:bg-orange-100 rounded-full p-2"
                        onClick={() => router.push("/cart")} // ✅ navigate to cart
                    >
                        <ShoppingCart />
                    </Button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between px-4 py-4 shadow-sm bg-white">
                <Link
                    href="/"
                    className="text-xl font-[BrunoAce] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
                >
                    Digitalzone
                </Link>

                <div className="flex-1 mx-2 relative">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-100 rounded-lg"
                    />

                    {results.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                            {results.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.slug}`}
                                    onClick={handleResultClick}
                                    className="block px-4 py-2 text-sm hover:bg-gray-100 truncate"
                                >
                                    {p.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="p-2 hover:bg-gray-100 rounded-full">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64 bg-white p-6 shadow-lg">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-6">
                            <Link
                                href="/"
                                className="text-purple-600 font-[BrunoAce] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
                            >
                                Digitalzone
                            </Link>
                            <Separator />
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className="font-medium hover:text-purple-600 transition bg-transparent border-none cursor-pointer text-left w-full"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <Separator />
                            <Button variant="ghost" className="text-green-600 hover:bg-green-100 rounded-full p-2">
                                <User /> Login
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-orange-600 hover:bg-orange-100 rounded-full p-2"
                                onClick={() => router.push("/cart")} // ✅ navigate mobile cart
                            >
                                <ShoppingCart /> Cart
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
