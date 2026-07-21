import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
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

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.93,
      transition: { duration: 0.24, ease: [0.55, 0, 1, 0.45] }
    }
  };

  return (
    <section id="shop" className="py-28 border-t border-border bg-paper relative p-container">

      {/* Grid Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase block mb-3">PRODUCT CATALOGUE</span>
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-ink mb-6">
          CHOOSE YOUR WEAPON
        </h2>
        <p className="text-xs md:text-sm font-semibold text-ink/65 leading-relaxed">
          From light baking release to robust gourmet avocado oil sprays, we formulation-engineered every bottle to deliver maximum culinary performance with near-zero fat content.
        </p>
      </motion.div>

      {/* Tab Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest transition-all select-none cursor-pointer border ${
              activeTab === tab
                ? "bg-ink text-paper border-ink shadow-md scale-[1.02]"
                : "bg-white text-ink/65 border-border hover:border-ink/40 hover:text-ink hover:scale-[1.01]"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* Grid Cards layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod, index) => {
            // Is this the lone last card in a 3-col grid?
            const isLoneLastCard =
              index === filteredProducts.length - 1 &&
              filteredProducts.length % 3 === 1;

            return (
            <motion.div
              layout
              key={prod.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (index % 3) * 0.07 }}
              className={`relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between border border-black/10 transition-shadow duration-300 hover:shadow-2xl group ${
                isLoneLastCard ? 'lg:col-start-2' : ''
              }`}
              style={{
                backgroundColor: `${prod.themeColor}18`,
                minHeight: "460px"
              }}
            >
              {/* Card Inset dashed frame */}
              <div
                className="absolute inset-2.5 border-2 border-dashed rounded-xl pointer-events-none z-10 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{ borderColor: `${prod.themeColor}50` }}
              />

              {/* Tag / Badge + Price */}
              <div className="flex justify-between items-start z-20">
                <span className="bg-white/85 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-ink/80 shadow-sm">
                  {prod.badge}
                </span>
                <div className="text-right">
                  <span className="font-display font-black text-xl tracking-wider text-ink/90">
                    ${prod.price}
                  </span>
                </div>
              </div>

              {/* Center product render & tilt on card hover */}
              <div className="relative flex-grow flex items-center justify-center py-6 z-20">
                <div
                  className="transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[5deg] will-change-transform"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <BottleRender product={prod} size="md" />
                </div>

                {/* Simulated shadow */}
                <div className="absolute bottom-4 w-20 h-2.5 bg-black/15 rounded-full blur-[6px] pointer-events-none" />
              </div>

              {/* Text Block & Quick CTA */}
              <div className="z-20 text-center">
                {/* Rating */}
                <div className="flex justify-center items-center space-x-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-[10px]"
                      style={{ color: i < Math.round(prod.rating) ? "#F59E0B" : "rgba(17,21,18,0.15)" }}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-[9px] font-bold text-ink/40 ml-1">({prod.reviews})</span>
                </div>

                <h3 className="font-display font-black text-lg uppercase tracking-wider text-ink mt-1">
                  {prod.name}
                </h3>
                <p className="text-[10px] text-ink/60 font-bold tracking-widest mt-1 mb-4 uppercase">
                  {prod.tagline}
                </p>

                {/* ADD TO BAG Button */}
                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-full bg-ink text-paper py-3.5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-90 transition-all select-none cursor-pointer flex items-center justify-center space-x-2 border border-ink shadow-md active:scale-[0.98] group/btn"
                >
                  <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:-rotate-12 transition-transform duration-300" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
