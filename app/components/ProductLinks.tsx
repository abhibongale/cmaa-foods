"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { getAssetPath } from "../utils/pathUtils";

export default function ProductLinks() {
  const { productLinks } = siteConfig;
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  if (!productLinks || !productLinks.active || productLinks.products.length === 0) {
    return null;
  }

  const selectedProductData = productLinks.products.find(
    (p) => p.id === selectedProduct
  );

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="md:col-span-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden h-full">
          <div className="p-10 md:p-12 lg:p-16">
            {productLinks.title && (
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#8B4513] mb-3">
                  {productLinks.title}
                </h2>
                {productLinks.subtitle && (
                  <p className="text-gray-600 text-lg md:text-xl">
                    {productLinks.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-center">
              {productLinks.products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border-2 border-gray-200 hover:border-[#8B4513] hover:shadow-2xl transition-all duration-300 bg-white"
                  aria-label={`View ${product.name} options`}
                >
                  {/* Product Image/GIF */}
                  <div className="relative w-full aspect-[4/3] max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto bg-transparent">
                    {hoveredProduct === product.id && product.gifSrc ? (
                      <Image
                        src={getAssetPath(product.gifSrc)}
                        alt={product.name}
                        fill
                        className="object-contain bg-transparent"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={getAssetPath(product.imageSrc)}
                        alt={product.name}
                        fill
                        className="object-contain bg-transparent"
                        unoptimized={product.unoptimized}
                      />
                    )}
                  </div>
                  {/* Product Name */}
                  {product.name && (
                    <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-700 group-hover:text-[#8B4513] transition-colors duration-300 text-center">
                      {product.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal/Popup for Third-Party Links */}
      {selectedProduct && selectedProductData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              {/* Product Header */}
              <div className="text-center mb-8">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                  <Image
                    src={getAssetPath(selectedProductData.imageSrc)}
                    alt={selectedProductData.name}
                    fill
                    className="object-contain"
                    unoptimized={selectedProductData.unoptimized}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#8B4513] mb-2">
                  {selectedProductData.name}
                </h3>
                {selectedProductData.description && (
                  <p className="text-gray-600 text-base md:text-lg">
                    {selectedProductData.description}
                  </p>
                )}
              </div>

              {/* Third-Party Links */}
              <div className="mb-6">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
                  Order Now on
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {selectedProductData.thirdPartyLinks?.map((link) => (
                    <Link
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 hover:border-[#8B4513] hover:shadow-lg transition-all duration-300 bg-white"
                      aria-label={`Order ${selectedProductData.name} on ${link.name}`}
                    >
                      {link.image && (
                        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Image
                            src={getAssetPath(link.image)}
                            alt={link.name}
                            fill
                            className="object-contain"
                            unoptimized={link.unoptimized}
                          />
                        </div>
                      )}
                      {link.name && (
                        <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-[#8B4513] transition-colors duration-300 text-center">
                          {link.name}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


