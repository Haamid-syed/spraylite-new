import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ cartCount = 0, onCartClick, onNavClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "OUR PILLARS",    target: "pillars" },
    { label: "SHOP",           target: "shop" },
    { label: "BUNDLE BUILDER", target: "bundles" },
    { label: "WHOLESALE",      target: "wholesale" }
  ];

  const handleMobileNav = (e, target) => {
    setMobileOpen(false);
    onNavClick(e, target);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 bg-paper/85 backdrop-blur-md border border-border rounded-full px-6 py-3.5 flex justify-between items-center transition-all duration-300 shadow-sm max-w-7xl mx-auto">

        {/* Brand — clicking scrolls to very top */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="font-display font-black text-lg tracking-wider hover:opacity-85 transition-opacity"
        >
          SPRAY LITE
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* HOME link — scrolls to top */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-flip-wrapper text-xs font-bold tracking-widest text-ink/75"
          >
            <span className="text-flip-inner">
              <span className="text-flip-primary">HOME</span>
              <span className="text-flip-secondary">HOME</span>
            </span>
          </a>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.target}`}
              onClick={(e) => onNavClick(e, item.target)}
              className="text-flip-wrapper text-xs font-bold tracking-widest text-ink/75"
            >
              <span className="text-flip-inner">
                <span className="text-flip-primary">{item.label}</span>
                <span className="text-flip-secondary">{item.label}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Right side: Cart + Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onCartClick}
            className="flex items-center space-x-2 bg-ink text-paper px-5 py-2.5 rounded-full hover:bg-ink/90 active:scale-95 transition-all text-xs font-bold tracking-wider cursor-pointer shadow-md select-none border border-ink"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BAG ({cartCount})</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden p-2 border border-border rounded-full hover:bg-ink/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4 text-ink" /> : <Menu className="w-4 h-4 text-ink" />}
          </button>
        </div>

      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-50 bg-paper/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden md:hidden"
            >
              <div className="py-3 px-2">
                {/* Home */}
                <motion.a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest text-ink/75 hover:bg-ink/5 hover:text-ink transition-all"
                >
                  <span>HOME</span>
                  <ChevronRight className="w-3.5 h-3.5 text-ink/20" />
                </motion.a>

                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={`#${item.target}`}
                    onClick={(e) => handleMobileNav(e, item.target)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index + 1) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold tracking-widest text-ink/75 hover:bg-ink/5 hover:text-ink transition-all"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-ink/20" />
                  </motion.a>
                ))}

                <div className="border-t border-border mx-4 my-2" />
                <a
                  href="#wholesale"
                  onClick={(e) => handleMobileNav(e, 'wholesale')}
                  className="flex items-center px-4 py-3 text-[10px] font-bold tracking-widest text-ink/40 hover:text-ink/70 transition-colors uppercase"
                >
                  B2B Commercial Inquiries
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
