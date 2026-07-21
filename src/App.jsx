import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import ProductGrid from './components/ProductGrid';
import BundleBuilder from './components/BundleBuilder';
import Marquee from './components/Marquee';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { products } from './data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeFlagshipId, setActiveFlagshipId] = useState("olive-oil");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Preloader Screen States
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Custom Cursor Follower States
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);

  const activeProduct = products.find(p => p.id === activeFlagshipId) || products[0];

  // Preloader progress counter interval
  useEffect(() => {
    let progressInterval;
    if (loading) {
      progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 8) + 3;
          if (next >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setLoading(false);
            }, 300);
            return 100;
          }
          return next;
        });
      }, 40);
    }
    return () => clearInterval(progressInterval);
  }, [loading]);

  // Track cursor coordinates & check for hovered interactive targets
  useEffect(() => {
    if (loading) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const hoverTarget = e.target.closest('button, a, select, [onClick], .cursor-none-all');
      setCursorHovered(!!hoverTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [loading]);

  // Prevent background scroll when overlays or loader is open
  useEffect(() => {
    if (isCartOpen || isCheckoutOpen || loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isCartOpen, isCheckoutOpen, loading]);

  // Always start at very top on load
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Custom premium smooth scroll for nav clicks
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 72;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1800; // Luxurious, unhurried scroll
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);

        // easeInOutQuart — very soft start and end, snappy middle
        const ease = (t) => t < 0.5
          ? 8 * t * t * t * t
          : 1 - Math.pow(-2 * t + 2, 4) / 2;

        window.scrollTo(0, startPosition + distance * ease(progress));
        if (progress < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    }
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-paper">
      
      {/* ══════════════════════════════════════════════
          LOADING SCREEN — dark ink, staggered letters
          ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#111512] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          >
            {/* Subtle radial glow in background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.12, scale: 1.8 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, #8D9973, transparent 60%)' }}
            />

            {/* Brand letters */}
            <div className="relative z-10 flex flex-col items-center">

              {/* SPRAY — slides up letter by letter */}
              <div className="flex overflow-hidden">
                {'SPRAY'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.055, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black leading-none tracking-[0.1em] text-[#FDFCF7]"
                    style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* LITE — outlined, slightly delayed */}
              <div className="flex overflow-hidden -mt-1">
                {'LITE'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.055, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black leading-none tracking-[0.1em]"
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(253,252,247,0.28)',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Tagline with flanking lines */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center space-x-4 mt-5"
              >
                <div className="h-px w-14 bg-white/12" />
                <span className="text-[8px] font-bold tracking-[0.55em] text-white/25 uppercase">Culinary Innovation</span>
                <div className="h-px w-14 bg-white/12" />
              </motion.div>

            </div>

            {/* Progress bar — bottom of screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute bottom-12 w-48"
            >
              <div className="h-px bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-white/40"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.12 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] text-white/20 font-bold tracking-widest">LOADING</span>
                <span className="text-[8px] text-white/20 font-bold tracking-widest">{loadingProgress}%</span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* mix-blend-mode cursor — appears white over dark, dark over light */}
      {!loading && (
        <>
          <motion.div 
            className="custom-cursor hidden md:block"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: isHeadingHovered ? 2.6 : cursorHovered ? 1.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.35 }}
            style={{ mixBlendMode: 'difference', backgroundColor: 'white', border: 'none' }}
          />
          <motion.div 
            className="custom-cursor-dot hidden md:block"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: isHeadingHovered || cursorHovered ? 0 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.15 }}
            style={{ mixBlendMode: 'difference', backgroundColor: 'white' }}
          />
        </>
      )}

      {/* Navbar Component with custom scroll callback */}
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} onNavClick={handleNavClick} />

      {/* Hero Section */}
      <Hero 
        activeFlagshipId={activeFlagshipId} 
        setActiveFlagshipId={setActiveFlagshipId} 
        onAddToCart={handleAddToCart}
        onNavClick={handleNavClick}
        onHeadingHover={setIsHeadingHovered}
      />

      {/* Pillars Section */}
      <Pillars />

      {/* Product Catalog Grid */}
      <ProductGrid onAddToCart={handleAddToCart} />

      {/* Bundle Builder Section */}
      <BundleBuilder onAddToCart={handleAddToCart} />

      {/* Infinite reviews ribbon */}
      <Marquee />

      {/* B2B Wholesale & Commercial Inquiries Form Section (Transparent to prevent contrast bounds) */}
      <section id="wholesale" className="py-24 border-t border-border p-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form pitch */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase block mb-3">B2B INQUIRIES</span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-ink mb-6">
              COMMERCIAL SOLUTIONS
            </h2>
            <p className="text-xs md:text-sm font-semibold text-ink/75 leading-relaxed mb-8">
              Are you a hotel chain, airline caterer, bakery, or regional distributor? Partner with Spray Lite for commercial-scale oil waste reduction, portions control, and custom aerosol white-label needs.
            </p>

            <div className="space-y-4 text-xs font-semibold text-ink/85">
              {[
                { icon: <Mail className="w-4 h-4 text-ink" />, text: 'wholesale@spraylite.com' },
                { icon: <Phone className="w-4 h-4 text-ink" />, text: '+91 22 4890 5500' },
                { icon: <MapPin className="w-4 h-4 text-ink" />, text: 'Andheri (E) Industrial Estate, Mumbai, MH 400093' },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center space-x-3.5"
                >
                  <div className="p-2 border border-border rounded-xl bg-white/70 shrink-0">{row.icon}</div>
                  <span>{row.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Inquiry form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Inquiry successfully submitted! Our commercial representative will reach out in 24 hours.");
              e.target.reset();
            }}
            className="lg:col-span-7 bg-white/60 backdrop-blur-md border border-border p-8 rounded-2xl shadow-sm space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Your Name</label>
                <input required type="text" placeholder="John Carter" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold transition-colors" />
              </div>
              <div>
                <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Company / Restaurant</label>
                <input required type="text" placeholder="Gourmet Delights" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Email Address</label>
              <input required type="email" placeholder="john@gourmet.com" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold transition-colors" />
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Estimated Canister Volume / Month</label>
              <select required className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold transition-colors">
                <option value="100-500">100 - 500 cans</option>
                <option value="500-2000">500 - 2,000 cans</option>
                <option value="2000+">2,000+ cans</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Message Details</label>
              <textarea required rows="4" placeholder="Tell us about your kitchen or distribution channels..." className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold resize-none transition-colors"></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-ink text-paper py-3.5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md select-none border border-ink"
            >
              SUBMIT B2B INQUIRY
            </button>
          </motion.form>

        </div>
      </section>

      {/* Rich Footer */}
      <footer className="bg-ink text-paper border-t border-white/10">
        
        {/* Main Footer Body */}
        <div className="p-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Col 1: Brand */}
            <div className="lg:col-span-1">
              <h4 className="font-display font-black text-2xl tracking-wider mb-3">SPRAY LITE</h4>
              <p className="text-[11px] text-paper/50 font-medium leading-relaxed max-w-[220px] mb-6">
                Bridging the gap between flavor and fitness — one precise spray at a time.
              </p>
              <div className="flex space-x-2.5">
                <a href="#" className="p-2.5 border border-white/15 hover:border-white/50 hover:bg-white/10 rounded-full text-paper/70 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2.5 border border-white/15 hover:border-white/50 hover:bg-white/10 rounded-full text-paper/70 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigate */}
            <div>
              <span className="text-[9px] font-bold tracking-widest text-paper/30 uppercase block mb-4">NAVIGATE</span>
              <ul className="space-y-2.5">
                {[
                  { label: "Our Pillars", target: "pillars" },
                  { label: "Shop All", target: "shop" },
                  { label: "Bundle Builder", target: "bundles" },
                  { label: "Wholesale B2B", target: "wholesale" },
                ].map(link => (
                  <li key={link.label}>
                    <a
                      href={`#${link.target}`}
                      onClick={(e) => handleNavClick(e, link.target)}
                      className="text-[11px] font-semibold text-paper/60 hover:text-paper transition-colors tracking-wide"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Products */}
            <div>
              <span className="text-[9px] font-bold tracking-widest text-paper/30 uppercase block mb-4">PRODUCTS</span>
              <ul className="space-y-2.5">
                {["Gourmet Olive Oil", "Pure Avocado Oil", "Rich Butter Flavor", "Oriental Sesame", "Groundnut Airfryer", "Pan Release Baking"].map(name => (
                  <li key={name}>
                    <a 
                      href="#shop" 
                      onClick={(e) => handleNavClick(e, 'shop')}
                      className="text-[11px] font-semibold text-paper/60 hover:text-paper transition-colors tracking-wide"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <span className="text-[9px] font-bold tracking-widest text-paper/30 uppercase block mb-4">STAY UPDATED</span>
              <p className="text-[11px] text-paper/50 font-medium leading-relaxed mb-4">
                Recipes, launch drops, and exclusive member discounts — straight to your inbox.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); alert("You're subscribed!"); e.target.reset(); }}
                className="flex items-center bg-white/10 border border-white/15 rounded-full p-1.5 focus-within:border-white/40 transition-colors"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent text-paper placeholder:text-paper/30 px-3 py-1.5 text-xs font-semibold focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-paper text-ink px-4 py-2 rounded-full font-bold tracking-widest text-[9px] hover:bg-paper/90 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  JOIN
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 p-container py-5 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-[9px] text-paper/30 font-semibold tracking-widest uppercase">
            © 2026 Spray Lite Culinary Innovations. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Use", "FSSAI Compliant"].map(item => (
              <a key={item} href="#" className="text-[9px] text-paper/30 hover:text-paper/60 font-semibold tracking-wider transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
