import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import BottleRender from './BottleRender';
import { products } from '../data/products';

export default function BundleBuilder({ onAddToCart }) {
  const [packSize, setPackSize] = useState(3); // 3-pack or 6-pack
  const [hoveredBottleId, setHoveredBottleId] = useState(null);

  // Trio Pack products
  const trioProducts = products.filter(p => ["olive-oil", "butter", "avocado"].includes(p.id));

  // Pro Cook Six products
  const sixProducts = products.filter(p => ["olive-oil", "butter", "avocado", "coconut", "natural-sunflower", "sesame"].includes(p.id));

  const activeProducts = packSize === 3 ? trioProducts : sixProducts;
  
  const bundleItem = {
    id: packSize === 3 ? "trio-bundle" : "pro-six-bundle",
    name: packSize === 3 ? "Trio Culinary Pack" : "Pro Cook Six Pack",
    category: "Bundle",
    price: packSize === 3 ? 36.99 : 64.99,
    originalPrice: packSize === 3 ? 44.97 : 82.94,
    badge: "15% OFF",
    tagline: packSize === 3 ? "Essential cooking toolkit" : "The ultimate pantry upgrade",
    description: packSize === 3 
      ? "Our three core flagship formulations (Olive, Butter, Avocado) designed to tackle daily frying, grilling, and roasting."
      : "Six diverse culinary sprays covering every cooking heat point and recipe flavor profile. Replaces up to 30L of pouring oils."
  };

  return (
    <section id="bundles" className="py-24 border-t border-border bg-[#F5EAD6]/40 relative p-container">
      
      {/* Decorative Blur Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-amber-200/25 rounded-full blur-[80px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10 relative">
        
        {/* Left column: Bundle options, description, add to cart */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 border border-ink/10 bg-white/60 rounded-full px-4 py-1.5 w-fit mb-6"
          >
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-bold tracking-widest text-ink/80">BULK DISCOUNTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-ink leading-none mb-6"
          >
            BUILD YOUR BUNDLE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-semibold text-ink/75 leading-relaxed max-w-xl mb-8"
          >
            Upgrade your pantry with our curated bundle packs and enjoy severe discounts. Replaces liters of grease with portion-controlled, non-stick culinary sprays.
          </motion.p>

          {/* Trio Pack vs Pro Cook Six Toggles */}
          <div className="inline-flex bg-white/80 backdrop-blur-sm border border-border p-1.5 rounded-full w-fit mb-8 shadow-sm">
            <button
              onClick={() => setPackSize(3)}
              className={`px-6 py-3 rounded-full text-xs font-black tracking-widest transition-all select-none cursor-pointer ${
                packSize === 3
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              TRIO PACK (3)
            </button>
            <button
              onClick={() => setPackSize(6)}
              className={`px-6 py-3 rounded-full text-xs font-black tracking-widest transition-all select-none cursor-pointer ${
                packSize === 6
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              PRO COOK SIX (6)
            </button>
          </div>

          {/* Active Bundle Details Card */}
          <div className="bg-white border border-border p-6 rounded-2xl shadow-sm mb-6 max-w-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[9px] uppercase tracking-widest bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                  {bundleItem.badge}
                </span>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink mt-1.5">{bundleItem.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-sm text-ink/40 line-through font-bold block">${bundleItem.originalPrice}</span>
                <span className="text-xl font-black text-ink">${bundleItem.price}</span>
              </div>
            </div>

            <p className="text-xs text-ink/70 leading-relaxed font-medium mb-4">
              {bundleItem.description}
            </p>

            <button
              onClick={() => onAddToCart(bundleItem)}
              className="w-full bg-ink text-paper py-4 rounded-xl font-bold tracking-widest text-xs hover:bg-opacity-95 transition-all select-none cursor-pointer active:scale-98 shadow-md"
            >
              ADD BUNDLE TO BAG
            </button>
          </div>

        </div>

        {/* Right column: Animated cans swap */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center">
          
          {/* Main Showcase Panel */}
          <div className="relative w-full h-[400px] flex items-end justify-center overflow-hidden border border-border bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-inner">
            
            {/* Outline Dashed Inner Frame */}
            <div className="absolute inset-2 border border-dashed border-ink/10 rounded-xl pointer-events-none" />

            {/* Asymmetric animation viewport */}
            <div className="w-full h-full flex items-end justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={packSize}
                  className="flex items-end justify-center space-x-3 sm:space-x-4 absolute bottom-6 w-full max-w-md"
                  initial={{ y: 72, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 72, opacity: 0 }}
                  transition={{
                    opacity: {
                      enter: { duration: 0.52, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
                      exit: { duration: 0.24, ease: [0.55, 0, 1, 0.45] }
                    },
                    y: {
                      enter: { duration: 0.52, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
                      exit: { duration: 0.24, ease: [0.55, 0, 1, 0.45] }
                    }
                  }}
                >
                  {activeProducts.map((prod, index) => {
                    const tilts = [-4, 3, -1, 5, -3, 2];
                    const activeTilt = tilts[index % tilts.length];
                    const isHovered = hoveredBottleId === prod.id;
                    const hasAnyHover = hoveredBottleId !== null;

                    return (
                      <motion.div 
                        key={prod.id} 
                        className="flex flex-col items-center cursor-pointer relative"
                        onMouseEnter={() => setHoveredBottleId(prod.id)}
                        onMouseLeave={() => setHoveredBottleId(null)}
                        animate={{
                          scale: isHovered ? 1.08 : hasAnyHover ? 0.82 : 1,
                          y: isHovered ? -10 : hasAnyHover ? 8 : 0,
                          opacity: isHovered ? 1 : hasAnyHover ? 0.55 : 1,
                          rotate: isHovered ? 0 : activeTilt,
                        }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      >
                        <BottleRender product={prod} size="sm" active={isHovered} />
                        {/* Shadow floor matching Hero section physics */}
                        <div 
                          className="w-13 h-1.5 bg-black/20 rounded-full blur-[3px] mt-1 transition-opacity duration-300 mx-auto" 
                          style={{ opacity: isHovered ? 0.6 : 0.2 }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          <div className="mt-4 flex items-center space-x-2 text-ink/40 text-[10px] font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 block shrink-0" />
            <span>HOVER EACH BOTTLE TO TRIGGER SPRAY MIST</span>
          </div>

        </div>

      </div>

    </section>
  );
}
