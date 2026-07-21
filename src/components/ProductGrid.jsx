import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, ShoppingCart } from 'lucide-react';
import BottleRender from './BottleRender';
import { products } from '../data/products';

export default function ProductGrid({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState("All");

  // Tabs based on categories
  const tabs = ["All", "Gourmet", "Everyday", "Flavor Specific", "Specialized"];

  // Filtered products list
  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="shop" className="py-24 border-t border-border bg-paper relative p-container">
      
      {/* Grid Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase block mb-3">PRODUCT CATALOGUE</span>
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-ink mb-6">
          CHOOSE YOUR WEAPON
        </h2>
        <p className="text-xs md:text-sm font-semibold text-ink/65 leading-relaxed">
          From light baking release to robust gourmet avocado oil sprays, we formulation-engineered every bottle to deliver maximum culinary performance with near-zero fat content.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all select-none cursor-pointer border ${
              activeTab === tab
                ? "bg-ink text-paper border-ink shadow-md scale-102"
                : "bg-white text-ink/75 border-border hover:border-ink/50 hover:text-ink"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid Cards layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod) => (
            <motion.div
              layout
              key={prod.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`relative overflow-hidden rounded-2xl p-6 h-[440px] flex flex-col justify-between border border-black/10 transition-shadow duration-300 hover:shadow-xl group`}
              style={{ backgroundColor: `${prod.themeColor}1a` }} // 10% opacity version of theme color as background card glow
            >
              
              {/* Card Inset dashed frame */}
              <div 
                className="absolute inset-2.5 border-2 border-dashed rounded-xl pointer-events-none z-10"
                style={{ borderColor: `${prod.themeColor}33` }} // 20% opacity border
              />

              {/* Tag / Badge */}
              <div className="flex justify-between items-start z-20">
                <span className="bg-white/80 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-ink/80 shadow-sm">
                  {prod.badge}
                </span>
                <span className="font-display font-black text-lg tracking-wider text-ink/90">
                  ${prod.price}
                </span>
              </div>

              {/* Center product render & tilt on card hover */}
              <div className="relative flex-grow flex items-center justify-center py-4 z-20">
                <motion.div
                  className="transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[5deg]"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <BottleRender product={prod} size="md" />
                </motion.div>
                
                {/* Simulated shadow */}
                <div className="absolute bottom-4 w-16 h-2 bg-black/15 rounded-full blur-[4px] pointer-events-none" />
              </div>

              {/* Text Block & Quick CTA */}
              <div className="z-20 text-center">
                <h3 className="font-display font-black text-lg uppercase tracking-wider text-ink mt-2">
                  {prod.name}
                </h3>
                <p className="text-[10px] text-ink/65 font-bold tracking-widest mt-1 mb-4 uppercase">
                  {prod.tagline}
                </p>

                {/* ADD TO BAG Button with text-reveal */}
                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-full bg-ink text-paper py-3.5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-90 transition-all select-none cursor-pointer flex items-center justify-center space-x-2 border border-ink shadow-md active:scale-98"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
