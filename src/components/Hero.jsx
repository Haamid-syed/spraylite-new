import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BottleRender from './BottleRender';
import { products } from '../data/products';

export default function Hero({ 
  activeFlagshipId, 
  setActiveFlagshipId, 
  onAddToCart, 
  onNavClick,
  onHeadingHover 
}) {
  const flagships = products.filter(p => ["olive-oil", "butter", "avocado"].includes(p.id));
  const activeProduct = products.find(p => p.id === activeFlagshipId) || flagships[0];

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 pt-28 pb-16 lg:py-0">

      {/* Background blur orbs — full width background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
          animate={{ backgroundColor: activeProduct.themeColor, x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
          animate={{ backgroundColor: activeProduct.themeColor, x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main grid wrapped inside p-container — responsive layout across all breakpoints */}
      <div className="p-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full z-10 pt-4 lg:pt-16">

        {/* ─── LEFT: Headline + CTAs ─── */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          {/* Heading — static position + hover trigger for magnifying cursor lens */}
          <h1 
            onMouseEnter={() => onHeadingHover?.(true)}
            onMouseLeave={() => onHeadingHover?.(false)}
            className="font-display font-black text-4xl sm:text-5xl lg:text-[clamp(3.2rem,5.5vw,5rem)] leading-[0.86] uppercase tracking-tighter text-ink flex flex-col space-y-1 select-none mb-0 cursor-pointer w-fit"
          >
            <motion.span
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              98% Less Fat.
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <span style={{ WebkitTextStroke: '1.5px var(--color-ink)', color: 'transparent', display: 'block' }}>
                100% Culinary
              </span>
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Freedom.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="text-ink/70 max-w-md text-xs md:text-sm font-medium mt-4 lg:mt-5 leading-relaxed"
          >
            One precise spray coats your pans evenly, reducing fat intake by over 98% per serving while replacing up to 5 litres of traditional oil.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 items-center mt-6"
          >
            <a
              href="#shop"
              onClick={(e) => onNavClick?.(e, 'shop')}
              className="group flex items-center space-x-2 bg-ink text-paper px-6 py-3 rounded-full font-bold tracking-widest text-[10px] border border-ink hover:bg-transparent hover:text-ink active:scale-95 transition-all shadow-md"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a
              href="#pillars"
              onClick={(e) => onNavClick?.(e, 'pillars')}
              className="px-5 py-3 border border-ink/20 hover:border-ink rounded-full font-bold tracking-widest text-[10px] text-ink/70 hover:text-ink active:scale-95 transition-all"
            >
              HOW IT WORKS
            </a>
          </motion.div>

        </div>

        {/* ─── RIGHT: Bottle Showcase ─── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0 pt-4 lg:pt-6">

          {/* Soft glow behind bottles */}
          <div className="absolute bottom-[110px] w-[220px] h-[220px] bg-white/25 border border-white/10 rounded-full blur-3xl z-0 pointer-events-none" />

          {/* Bottles — md size on desktop/laptop, sm on mobile */}
          <div className="flex items-end justify-center space-x-4 h-[220px] sm:h-[260px] lg:h-[320px] w-full z-10">
            {flagships.map((prod) => {
              const isActive = prod.id === activeFlagshipId;
              return (
                <motion.div
                  key={prod.id}
                  onClick={() => setActiveFlagshipId(prod.id)}
                  className="cursor-pointer relative flex flex-col items-center"
                  animate={{
                    scale: isActive ? 1.04 : 0.82,
                    y: isActive ? 0 : 12,
                    opacity: isActive ? 1 : 0.55,
                    rotate: isActive ? 0 : prod.id === 'olive-oil' ? -5 : 5,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  whileHover={{ scale: isActive ? 1.06 : 0.88, opacity: 0.85 }}
                >
                  {/* Desktop gets size="md", Mobile gets size="sm" */}
                  <div className="hidden lg:block">
                    <BottleRender product={prod} size="md" active={isActive} />
                  </div>
                  <div className="block lg:hidden">
                    <BottleRender product={prod} size="sm" active={isActive} />
                  </div>

                  <div
                    className="w-13 h-1.5 bg-black/20 rounded-full blur-[4px] mt-1 mx-auto transition-opacity duration-300"
                    style={{ opacity: isActive ? 0.6 : 0.15 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Active product info card */}
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xs mt-3 border border-border bg-white/75 backdrop-blur-md p-4 rounded-xl shadow-sm z-20"
          >
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-ink/45 font-bold">{activeProduct.category}</span>
                <h3 className="font-display font-black text-base leading-tight uppercase mt-0.5">{activeProduct.name}</h3>
              </div>
              <div className="bg-ink text-paper px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0 ml-2">
                ${activeProduct.price}
              </div>
            </div>

            <p className="text-[10px] text-ink/65 leading-normal italic mb-2.5">
              "{activeProduct.tagline}"
            </p>

            <div className="grid grid-cols-2 gap-2 border-t border-b border-border py-2 mb-3 text-center">
              <div>
                <span className="text-[7px] uppercase tracking-wider text-ink/40 font-bold block">1 Spoon Oil</span>
                <span className="text-[11px] font-bold text-red-500 line-through">{activeProduct.caloriesTraditional} kcal</span>
              </div>
              <div className="border-l border-border">
                <span className="text-[7px] uppercase tracking-wider text-ink/40 font-bold block">1 Spray</span>
                <span className="text-[11px] font-black text-emerald-600">{activeProduct.caloriesSpray} kcal</span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(activeProduct)}
              className="w-full bg-ink text-paper py-2.5 rounded-lg font-bold tracking-widest text-[9px] hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-md select-none cursor-pointer"
            >
              ADD TO BAG
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
