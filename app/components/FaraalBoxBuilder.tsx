"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Plus, ShoppingBag, Trash2, AlertCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

// --- UTILITY FOR SECURE CLASS MERGING ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Snack = {
  id: string;
  name: string;
  price: number;
  quantity?: string; // e.g., "1 kg", "500g", "1 packet"
  color: string;
  image: string;
};

type BoxItem = Snack & { uniqueId: string };

export default function FaraalBoxBuilder() {
  const { faraalBox } = siteConfig;
  const SNACKS = faraalBox.snacks;
  const MAX_CAPACITY = faraalBox.maxCapacity;
  const [boxItems, setBoxItems] = useState<BoxItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Helper: Check if box is full
  const isFull = boxItems.length >= MAX_CAPACITY;
  const totalPrice = boxItems.reduce((sum, item) => sum + item.price, 0);

  // Function to add item securely
  const addToBox = async (item: typeof SNACKS[0]) => {
    if (boxItems.length < MAX_CAPACITY) {
      // Add a unique ID so we can have multiple of the same item
      const newItem = { ...item, uniqueId: `${item.id}-${Date.now()}` };
      setBoxItems((prev) => [...prev, newItem]);
      
      // Trigger a subtle "shake" animation on the box to show feedback
      await controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.2 }
      });
    }
  };

  const removeFromBox = (uniqueId: string) => {
    setBoxItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  return (
    <div className="bg-[#FDFBF7] rounded-3xl border border-[#F5E6D3] shadow-xl overflow-hidden h-full">
      <div className="p-10 md:p-16">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#8B4513] mb-4">{faraalBox.title}</h2>
          <p className="text-gray-600 text-base md:text-lg">
            {faraalBox.description}
          </p>
        </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* --- LEFT SIDE: SNACK INVENTORY --- */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SNACKS.map((snack) => (
            <motion.div
              key={snack.id}
              layoutId={`product-${snack.id}`}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(event, info) => {
                setIsDragging(false);
                // Simple logic: if dragged far enough to the right (desktop) or down (mobile)
                if (info.offset.x > 100 || info.offset.y > 100) {
                  addToBox(snack);
                }
              }}
              className={cn(
                "bg-white p-4 rounded-xl border border-[#F5E6D3] relative cursor-grab active:cursor-grabbing z-20 group",
                isFull && "opacity-50 cursor-not-allowed grayscale-[0.5]"
              )}
            >
              {/* Hover Tooltip */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm">
                  <div className="font-semibold">₹{snack.price}</div>
                  {snack.quantity && (
                    <div className="text-xs text-gray-300 mt-0.5">for {snack.quantity}</div>
                  )}
                  {/* Arrow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-square rounded-lg mb-4 overflow-hidden bg-gray-100">
                <Image
                  src={snack.image}
                  alt={snack.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-serif text-[#8B4513] font-semibold">{snack.name}</h4>
                  <span className="text-sm text-gray-500">₹{snack.price}</span>
                  {snack.quantity && (
                    <span className="text-xs text-gray-400 block mt-0.5">{snack.quantity}</span>
                  )}
                </div>
                
                {/* Mobile/Click Friendly Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drag event conflict
                    addToBox(snack);
                  }}
                  disabled={isFull}
                  className="p-2 bg-[#FFF8E7] text-[#8B4513] rounded-full hover:bg-[#8B4513] hover:text-white transition-colors disabled:opacity-50"
                  aria-label={`Add ${snack.name} to box`}
                >
                  <Plus size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- RIGHT SIDE: THE BOX (DROP ZONE) --- */}
        <div className="lg:col-span-5 sticky top-24 z-10">
          <motion.div 
            ref={boxRef}
            animate={controls}
            className={cn(
              "bg-white rounded-2xl shadow-xl border-2 border-dashed p-6 transition-colors duration-300 relative overflow-hidden",
              isDragging ? "border-[#D97706] bg-[#FFF8E1]" : "border-[#D97706]/30",
              isFull ? "border-green-500/50 bg-green-50/30" : ""
            )}
          >
            {/* Box Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-[#8B4513] flex items-center gap-2">
                <ShoppingBag size={20} /> Your Box
              </h3>
              <div className="text-right">
                <span className="block text-xs text-gray-400 uppercase tracking-wider">Total</span>
                <span className="text-lg font-bold text-[#D97706]">₹{totalPrice}</span>
              </div>
            </div>

            {/* Visual Capacity Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full mb-6 overflow-hidden relative">
               <motion.div 
                 className={cn("h-full absolute left-0 top-0", isFull ? "bg-green-500" : "bg-[#D97706]")}
                 initial={{ width: 0 }}
                 animate={{ width: `${(boxItems.length / MAX_CAPACITY) * 100}%` }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
            </div>

            {/* Empty State */}
            {boxItems.length === 0 && (
              <div className="h-48 flex flex-col items-center justify-center text-gray-400 border border-gray-100 rounded-lg bg-gray-50/50">
                <p>Your box is empty</p>
                <p className="text-xs mt-1 text-gray-400">Add {MAX_CAPACITY} packets to continue</p>
              </div>
            )}

            {/* List of Items in Box */}
            <div className="space-y-3 min-h-[100px]">
              <AnimatePresence mode="popLayout">
                {boxItems.map((item) => (
                  <motion.div
                    key={item.uniqueId}
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    layout
                    className="flex items-center gap-3 bg-[#FDFBF7] p-3 rounded-lg border border-[#F5E6D3] shadow-sm group"
                  >
                    <div className="relative w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#8B4513] truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">₹{item.price}</p>
                    </div>

                    <button 
                      onClick={() => removeFromBox(item.uniqueId)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Action */}
            <div className="mt-8 border-t border-dashed border-gray-200 pt-6">
               <button 
                 disabled={boxItems.length === 0}
                 className="w-full py-4 bg-[#8B4513] text-white font-serif text-lg rounded-xl hover:bg-[#6D360F] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex justify-center items-center gap-2"
               >
                 {isFull ? "Proceed to Checkout" : `Add ${MAX_CAPACITY - boxItems.length} more to checkout`}
               </button>
               {isFull && (
                 <p className="text-center text-green-600 text-xs mt-3 flex items-center justify-center gap-1">
                   <AlertCircle size={12} /> Perfect box! Ready to ship.
                 </p>
               )}
            </div>

          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}