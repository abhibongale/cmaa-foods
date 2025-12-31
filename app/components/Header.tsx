"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../data/siteConfig";
import Search from "./Search";

export default function Header() {
  const { header } = siteConfig;
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold font-serif text-[#8B4513] hover:opacity-80 transition-opacity">
          {header.logo}
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {header.navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`text-sm font-medium transition-colors pb-1 ${
                  isActive
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <Search />
          <Link
            href="/checkout"
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors relative"
            aria-label="Checkout"
          >
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

