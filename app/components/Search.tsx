"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "../data/siteConfig";
import Image from "next/image";

interface SearchResult {
  type: "product" | "blog" | "page";
  title: string;
  description?: string;
  url: string;
  image?: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close on outside click and ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    // Search Faraal Box snacks
    const { faraalBox } = siteConfig;
    faraalBox.snacks.forEach((snack) => {
      if (
        snack.name.toLowerCase().includes(searchTerm) ||
        snack.id.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: "product",
          title: snack.name,
          description: `₹${snack.price}${snack.quantity ? ` for ${snack.quantity}` : ""}`,
          url: `/#faraal-box`,
          image: snack.image,
        });
      }
    });

    // Search blog posts
    const { blogPosts } = siteConfig;
    blogPosts?.forEach((post) => {
      if (
        post.title.toLowerCase().includes(searchTerm) ||
        post.slogan?.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: "blog",
          title: post.title,
          description: post.slogan || post.content.substring(0, 100).replace(/<[^>]*>/g, ""),
          url: `/blog/${post.slug}`,
          image: post.imageSrc,
        });
      }
    });

    // Search pages
    const pages = [
      { title: "Home", url: "/", keywords: ["home", "main", "landing"] },
      { title: "Sweet (God)", url: "/sweet", keywords: ["sweet", "god", "ladoo", "barfi"] },
      { title: "Seasonal", url: "/seasonal", keywords: ["seasonal", "festival", "special"] },
    ];

    pages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(searchTerm) ||
        page.keywords.some((keyword) => keyword.includes(searchTerm))
      ) {
        searchResults.push({
          type: "page",
          title: page.title,
          description: `Navigate to ${page.title} page`,
          url: page.url,
        });
      }
    });

    setResults(searchResults);
  }, [query]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={handleSearchClick}
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div
            ref={searchRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, blog posts, pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {query.trim() === "" ? (
                <div className="text-center text-gray-400 py-12">
                  <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start typing to search...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <Link
                      key={index}
                      href={result.url}
                      onClick={handleClose}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      {result.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-amber-600 uppercase">
                            {result.type}
                          </span>
                          <h3 className="font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                            {result.title}
                          </h3>
                        </div>
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

