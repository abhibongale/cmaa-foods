"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, AlertCircle, Check, Info } from 'lucide-react';
// import clsx from 'clsx'; // Unused import

export default function ProductPage() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // --- MOCK DATA FOR HOTSPOTS ---
  // Tweak 'top' and 'left' % values to match your final generated image
  const hotspots = [
    { id: 'poha', label: 'Dagadi Poha (Thick)', desc: 'Absorbs less oil, stays crunchier.', top: '40%', left: '50%' },
    { id: 'cashew', label: 'Goan Cashews', desc: 'Fried to golden perfection.', top: '30%', left: '65%' },
    { id: 'curry', label: 'Fresh Curry Leaves', desc: 'The soul of the flavor.', top: '55%', left: '35%' },
    { id: 'raisin', label: 'Nashik Raisins', desc: 'A sweet surprise in every bite.', top: '60%', left: '70%' },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A4A4A] pb-20">
      
      {/* --- BREADCRUMB --- */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500">
        Home / Savoury / <span className="text-[#8B4513] font-medium">Puneri Golden Chivda</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* --- LEFT: INTERACTIVE IMAGE --- */}
        <div className="relative sticky top-24">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[#F5E6D3] bg-white group">
            
            {/* PLACEHOLDER IMAGE - Replace src with your generated image */}
            <Image 
              src="/assets/chivda-hero.jpg" 
              alt="Puneri Golden Chivda"
              fill
              className="object-cover"
              priority
            />

            {/* HOTSPOTS LAYER */}
            {hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute w-8 h-8 -ml-4 -mt-4 z-20 cursor-pointer"
                style={{ top: spot.top, left: spot.left }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pulsing Ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40 animate-ping"></span>
                {/* The Dot */}
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-[#8B4513] m-2 shadow-sm"></span>

                {/* The Tooltip (Visible on Hover) */}
                <AnimatePresence>
                  {activeHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-[#F5E6D3] text-center z-30 pointer-events-none"
                    >
                      <p className="text-xs font-bold text-[#8B4513] uppercase tracking-wider">{spot.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{spot.desc}</p>
                      {/* Little arrow at bottom */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white/95" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Hint for users */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                Hover over dots to see ingredients
              </span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: PRODUCT INFO --- */}
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#D97706]/10 text-[#D97706] text-xs font-bold px-2 py-1 rounded">BESTSELLER</span>
              <div className="flex text-[#D97706]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                <span className="ml-2 text-gray-400 text-xs">(452 Reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#8B4513] mb-4">
              Puneri Golden Chivda
            </h1>
            <p className="text-xl font-medium text-gray-900">
              ₹120 <span className="text-sm text-gray-500 font-normal ml-2">/ 250g pack</span>
            </p>
          </div>

          {/* Short Description */}
          <blockquote className="border-l-4 border-[#D97706] pl-4 italic text-gray-600 bg-white/50 p-4 rounded-r-lg">
            &quot;Thin poha is for diet. Thick poha is for emotion. We use the thickest Dagadi Poha, fried to a golden crisp that snaps loud enough to wake up your neighbors.&quot;
          </blockquote>

          {/* Add to Cart Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F5E6D3]">
            <div className="flex gap-4 items-center mb-6">
               {/* Quantity Selector */}
               <div className="flex items-center border border-gray-300 rounded-lg">
                 <button className="px-4 py-2 hover:bg-gray-100 text-lg">-</button>
                 <span className="px-4 font-medium">1</span>
                 <button className="px-4 py-2 hover:bg-gray-100 text-lg">+</button>
               </div>
               <div className="text-sm text-green-600 flex items-center gap-1">
                 <Check size={16} /> In Stock, Fresh Batch
               </div>
            </div>
            
            <button className="w-full py-4 bg-[#8B4513] text-white font-serif text-lg rounded-xl hover:bg-[#6D360F] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
              <ShoppingBag className="group-hover:scale-110 transition-transform" /> 
              Add to Cart 
              <span className="text-sm opacity-80 font-sans font-normal">(Subtle Crunch Sound)</span>
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">
              Free shipping on orders above ₹499 in Pune.
            </p>
          </div>

          {/* --- THE PUNERI BADGE (System Requirements) --- */}
          <div className="bg-[#FFF8E7] border border-[#F5E6D3] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D97706] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
              Tech Specs
            </div>
            
            <h3 className="font-serif text-[#8B4513] text-lg mb-4 flex items-center gap-2">
              <Info size={18} /> System Requirements
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#D97706]/20 pb-2">
                <span className="text-gray-600">Operating System</span>
                <span className="font-medium text-[#8B4513]">Human v1.0 (Hungry)</span>
              </div>
              <div className="flex justify-between border-b border-[#D97706]/20 pb-2">
                <span className="text-gray-600">Compatibility</span>
                <span className="font-medium text-[#8B4513]">Adrak Chai, Coding Sprints</span>
              </div>
              <div className="flex justify-between border-b border-[#D97706]/20 pb-2">
                <span className="text-gray-600">Crunch Level</span>
                <span className="font-medium text-[#8B4513]">High Decibel (Noise Cancelling Recommended)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-600 flex items-center gap-1">
                  <AlertCircle size={14} className="text-red-500" /> Known Bugs
                </span>
                <span className="font-medium text-red-500">Highly Addictive</span>
              </div>
            </div>
          </div>

          {/* Ingredients Text */}
          <div className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Ingredients:</strong> Dagadi Poha, Groundnut Oil, Split Chickpeas (Dalia), Cashews, Raisins, Dry Coconut Slices (Khobra), Curry Leaves, Turmeric, Salt, Sugar, Hing.
          </div>

        </div>
      </div>
    </main>
  );
}