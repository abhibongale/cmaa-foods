"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Sweet products data - Easy to update
const sweetProducts = [
  {
    id: "1",
    name: "Besan Ladoo",
    price: 180,
    description: "Traditional gram flour ladoos, rich and melt-in-mouth.",
    image: "/assets/ladoo.jpg",
    color: "bg-amber-100",
  },
  {
    id: "2",
    name: "Til-Gul Ladoo",
    price: 200,
    description: "Sesame and jaggery ladoos, perfect for Makar Sankranti.",
    image: "/assets/ladoo.jpg",
    color: "bg-yellow-100",
  },
  {
    id: "3",
    name: "Rava Ladoo",
    price: 160,
    description: "Semolina ladoos with ghee and nuts.",
    image: "/assets/ladoo.jpg",
    color: "bg-orange-50",
  },
  {
    id: "4",
    name: "Kaju Katli",
    price: 350,
    description: "Premium cashew fudge, diamond-cut and silver leafed.",
    image: "/assets/ladoo.jpg",
    color: "bg-amber-50",
  },
  {
    id: "5",
    name: "Badam Barfi",
    price: 320,
    description: "Almond fudge, rich and creamy.",
    image: "/assets/ladoo.jpg",
    color: "bg-yellow-50",
  },
  {
    id: "6",
    name: "Gulab Jamun",
    price: 250,
    description: "Soft, syrup-soaked milk dumplings.",
    image: "/assets/ladoo.jpg",
    color: "bg-pink-50",
  },
];

export default function SweetPage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Sweet (God)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Indulge in our traditional sweet treats, handcrafted with love and authentic recipes. 
            From ladoos to barfis, each sweet is made with premium ingredients.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweetProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`relative aspect-square ${product.color} overflow-hidden`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#8B4513]">₹{product.price}</span>
                  <span className="text-gray-400 group-hover:text-[#8B4513] transition-colors flex items-center gap-1">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 text-center border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
            Custom Sweet Box Available
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create your own mix of sweets for festivals, celebrations, or gifting. 
            Choose from our wide variety of traditional sweets.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Build Your Sweet Box <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

