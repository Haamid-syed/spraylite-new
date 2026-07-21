import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import BottleRender from './BottleRender';
import { products } from '../data/products';

export default function Hero({ activeFlagshipId, setActiveFlagshipId, onAddToCart }) {
  // Flagship products: Olive Oil, Butter, Avocado Oil
  const flagships = products.filter(p => ["olive-oil", "butter", "avocado"].includes(p.id));
  const activeProduct = products.find(p => p.id === activeFlagshipId) || flagships[0];

  // Helper to split text for interactive letters
  const hoverWordProps = {
    whileHover: { scale: 1.03, y: -3, transition: { type: "spring", stiffness: 400, damping: 10 } },
    className: "inline-block cursor-none-all select-none mr-2"
  };

  return (
    <section className="relative h-screen min-h-[640px] max-h-[780px] pt-20 pb-4 flex items-center overflow-hidden transition-colors duration-700 p-container">
      
      {/* Decorative Blur Background matching the "Liquid Glass" system */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-25"
          animate={{
            backgroundColor: activeProduct.themeColor,
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-25"
          animate={{
            backgroundColor: activeProduct.themeColor,
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full z-10">
        
        {/* Left Side: Headline and Brand Value Pitch */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Tagline badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 border border-ink/10 bg-ink/[0.03] rounded-full px-4 py-1 w-fit mb-4 cursor-none-all"
          >
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-[9px] font-bold tracking-widest text-ink/80">AMERICAN AEROSOL FORMULA</span>
          </motion.div>

          {/* Staggered Heading with interactive word hover effects */}
          <h1 className="text-display font-black text-4xl md:text-6xl xl:text-[84px] leading-[0.85] uppercase tracking-tighter text-ink flex flex-col cursor-none-all">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap"
            >
              {["98%", "Less", "Fat."].map((w, idx) => (
                <motion.span key={idx} {...hoverWordProps}>{w}</motion.span>
              ))}
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-transparent flex flex-wrap"
              style={{ WebkitTextStroke: "1.5px var(--color-ink)" }}
            >
              {["100%", "Culinary"].map((w, idx) => (
                <motion.span key={idx} {...hoverWordProps} className="inline-block cursor-none-all select-none mr-2 font-bold text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-ink)" }}>{w}</motion.span>
              ))}
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap"
            >
              {["Freedom."].map((w, idx) => (
                <motion.span key={idx} {...hoverWordProps}>{w}</motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-ink/75 max-w-xl text-xs md:text-sm font-medium mt-4 leading-relaxed"
          >
            Spray Lite bridges the gap between flavor and fitness. One precise spray coats your pans evenly, reducing fat intake by over 98% per serving while replacing up to 5 litres of traditional oil.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 items-center mt-6"
          >
            <a 
              href="#shop"
              className="group flex items-center space-x-2 bg-ink text-paper px-6 py-3 rounded-full font-bold tracking-widest text-[10px] border border-ink hover:bg-transparent hover:text-ink active:scale-95 transition-all shadow-md"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            
            <a 
              href="#pillars"
              className="px-5 py-3 border border-ink/20 hover:border-ink rounded-full font-bold tracking-widest text-[10px] text-ink/80 hover:text-ink active:scale-95 transition-all"
            >
              HOW IT WORKS
            </a>
          </motion.div>

        </div>

        {/* Right Side: Interactive Bottle Spotlight & Selection Info */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
          
          {/* Background Spotlight Glow */}
          <div className="absolute w-[260px] h-[260px] bg-white/40 border border-white/20 rounded-full blur-2xl z-0 pointer-events-none" />

          {/* Bottles Presentation Floor */}
          <div className="flex items-end justify-center space-x-4 h-[350px] w-full z-10">
            {flagships.map((prod) => {
              const isActive = prod.id === activeFlagshipId;
              
              return (
                <motion.div
                  key={prod.id}
                  onClick={() => setActiveFlagshipId(prod.id)}
                  className="cursor-pointer relative flex flex-col items-center"
                  animate={{
                    scale: isActive ? 1.05 : 0.85,
                    y: isActive ? -10 : 10,
                    opacity: isActive ? 1 : 0.65,
                    rotate: isActive ? 0 : prod.id === "olive-oil" ? -4 : 4
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <BottleRender product={prod} size="md" active={isActive} />
                  
                  {/* Under-bottle shadow element */}
                  <div 
                    className="w-20 h-2 bg-black/25 rounded-full blur-[4px] mt-1.5 transition-opacity duration-300 mx-auto"
                    style={{ opacity: isActive ? 0.7 : 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Active Flagship Details Container */}
          <motion.div 
            key={activeProduct.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm mt-4 border border-border bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm z-20 flex flex-col"
          >
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-ink/50 font-bold">{activeProduct.category}</span>
                <h3 className="font-display font-black text-lg leading-tight uppercase mt-0.5">{activeProduct.name}</h3>
              </div>
              <div className="bg-ink text-paper px-2.5 py-0.5 rounded-full text-[10px] font-black">
                ${activeProduct.price}
              </div>
            </div>
            
            <p className="text-[11px] text-ink/75 leading-normal italic mb-3">
              "{activeProduct.tagline}" &mdash; {activeProduct.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 border-t border-b border-border py-2 mb-3 text-center">
              <div>
                <span className="text-[7px] uppercase tracking-wider text-ink/50 font-bold block">1 Spoon Oil</span>
                <span className="text-[11px] font-bold text-red-500 line-through">{activeProduct.caloriesTraditional} kcal</span>
              </div>
              <div className="border-l border-border">
                <span className="text-[7px] uppercase tracking-wider text-ink/50 font-bold block">1 Spray Lite</span>
                <span className="text-[11px] font-black text-emerald-600">{activeProduct.caloriesSpray} kcal</span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(activeProduct)}
              className="w-full bg-ink text-paper py-2.5 rounded-lg font-bold tracking-widest text-[9px] hover:bg-opacity-90 active:scale-98 transition-all shadow-md select-none cursor-pointer"
            >
              ADD TO BAG
            </button>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

