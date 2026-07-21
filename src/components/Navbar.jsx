import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount = 0, onCartClick, onNavClick }) {
  // Navigation items mapping
  const navItems = [
    { label: "SHOP", target: "shop" },
    { label: "OUR PILLARS", target: "pillars" },
    { label: "BUNDLE BUILDER", target: "bundles" },
    { label: "WHOLESALE", target: "wholesale" }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-paper/85 backdrop-blur-md border border-border rounded-full px-6 py-3.5 flex justify-between items-center transition-all duration-300 shadow-sm max-w-7xl mx-auto cursor-none-all">
      
      {/* Brand Logo */}
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="font-display font-black text-lg tracking-wider hover:opacity-85 transition-opacity"
      >
        SPRAY LITE
      </a>

      {/* Nav Links - Custom smooth scroll click trigger */}
      <div className="hidden md:flex space-x-8 items-center">
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

      {/* Cart button with flip effect & badge */}
      <button 
        onClick={onCartClick}
        className="flex items-center space-x-2 bg-ink text-paper px-5 py-2.5 rounded-full hover:bg-ink/90 active:scale-95 transition-all text-xs font-bold tracking-wider cursor-pointer shadow-md select-none border border-ink"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span className="relative overflow-hidden h-[1.1em] leading-[1.1em] block">
          <span className="block transition-transform duration-300 hover:-translate-y-1/2">
            <span className="block">BAG ({cartCount})</span>
          </span>
        </span>
      </button>

    </nav>
  );
}

