"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Seasonal products data - Easy to update
const seasonalProducts = [
  {
    id: "s1",
    name: "Makar Sankranti Til-Gul Ladoo",
    price: 200,
    description: "Traditional sesame and jaggery ladoos for the harvest festival.",
    image: "/assets/ladoo.jpg",
    color: "bg-amber-100",
    season: "January",
    badge: "Limited Time",
  },
  {
    id: "s2",
    name: "Holi Gujiya",
    price: 180,
    description: "Sweet dumplings filled with khoya and dry fruits, perfect for Holi.",
    image: "/assets/ladoo.jpg",
    color: "bg-pink-50",
    season: "March",
    badge: "Coming Soon",
  },
  {
    id: "s3",
    name: "Diwali Faral Mix",
    price: 450,
    description: "Special festive mix of chivda, chakli, and sweets for Diwali.",
    image: "/assets/ladoo.jpg",
    color: "bg-yellow-100",
    season: "October-November",
    badge: "Pre-order",
  },
  {
    id: "s4",
    name: "Ganesh Chaturthi Modak",
    price: 220,
    description: "Steamed sweet dumplings, Lord Ganesha's favorite.",
    image: "/assets/ladoo.jpg",
    color: "bg-green-50",
    season: "August-September",
    badge: "Seasonal",
  },
  {
    id: "s5",
    name: "Raksha Bandhan Special",
    price: 380,
    description: "Gift box with traditional sweets and savories for siblings.",
    image: "/assets/ladoo.jpg",
    color: "bg-purple-50",
    season: "August",
    badge: "Gift Box",
  },
  {
    id: "s6",
    name: "Navratri Fasting Snacks",
    price: 320,
    description: "Special vrat-friendly snacks made with sabudana and singhara.",
    image: "/assets/ladoo.jpg",
    color: "bg-blue-50",
    season: "March-April, September-October",
    badge: "Vrat Special",
  },
];

// Get current season products
const getCurrentSeasonProducts = () => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  return seasonalProducts.filter((product) => {
    const seasons = product.season.split("-");
    return seasons.some((s) => {
      const monthNames: Record<string, number[]> = {
        January: [1],
        March: [3],
        "August-September": [8, 9],
        "October-November": [10, 11],
        "March-April": [3, 4],
        "September-October": [9, 10],
        August: [8],
      };
      return monthNames[s]?.includes(currentMonth);
    });
  });
};

export default function SeasonalPage() {
  const currentProducts = getCurrentSeasonProducts();
  const upcomingProducts = seasonalProducts.filter(
    (p) => !currentProducts.includes(p)
  );

  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Seasonal Specials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate festivals with our traditional seasonal treats. 
            Each festival brings unique flavors and recipes passed down through generations.
          </p>
        </div>

        {/* Current Season */}
        {currentProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-amber-600" />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Available Now
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 relative"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className={`relative aspect-square ${product.color} overflow-hidden`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-1">{product.season}</p>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#8B4513]">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-400 group-hover:text-[#8B4513] transition-colors flex items-center gap-1">
                        View <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Seasons */}
        {upcomingProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Upcoming Seasons
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden opacity-75 relative"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className={`relative aspect-square ${product.color} overflow-hidden`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-1">{product.season}</p>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-400">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-300 text-sm">Coming Soon</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 text-center border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
            Pre-order Seasonal Specials
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don&apos;t miss out on your favorite festival treats! Pre-order now and 
            we&apos;ll prepare fresh batches just for you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

