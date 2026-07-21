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

  // Custom Slower Eased Smooth Scroll for Navigation clicks
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 80; // offset fixed navbar
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Custom slower, premium scroll speed
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        // easeInOutCubic curve interpolation
        const easeInOutCubic = (t) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const factor = easeInOutCubic(Math.min(progress / duration, 1));
        window.scrollTo(0, startPosition + distance * factor);
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
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
    // Dynamic background with radial gradient fixed attachment to prevent scrolling contrast edges
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out bg-paper"
      style={{
        background: `radial-gradient(circle at 80% 20%, ${activeProduct.themeColor}1a 0%, #FDFCF7 50%)`,
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* 1. Typographic Loading Screen Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#FDFCF7] z-[9999] flex flex-col items-center justify-center p-6 border-b border-border select-none"
          >
            <div className="flex flex-col items-center max-w-xs w-full space-y-6">
              
              {/* Spaced logo reveal */}
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-2xl md:text-3xl tracking-[0.4em] uppercase text-ink text-center"
              >
                SPRAY LITE
              </motion.h2>

              {/* Progress Line */}
              <div className="w-full h-[1px] bg-ink/10 relative overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-ink"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* preloader stats */}
              <div className="flex justify-between w-full text-[9px] font-bold text-ink/40 tracking-widest uppercase">
                <span>EST. 2026 LABS</span>
                <span>{loadingProgress}%</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cursor Follower (Hidden on Mobile) */}
      {!loading && (
        <>
          <motion.div 
            className="custom-cursor hidden md:block"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: cursorHovered ? 1.6 : 1,
              backgroundColor: cursorHovered ? "rgba(17, 21, 18, 0.05)" : "rgba(17, 21, 18, 0)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
          />
          <motion.div 
            className="custom-cursor-dot hidden md:block"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: cursorHovered ? 0.6 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.15 }}
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
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase block mb-3">B2B INQUIRIES</span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-ink mb-6">
              COMMERCIAL SOLUTIONS
            </h2>
            <p className="text-xs md:text-sm font-semibold text-ink/75 leading-relaxed mb-8">
              Are you a hotel chain, airline caterer, bakery, or regional distributor? Partner with Spray Lite for commercial-scale oil waste reduction, portions control, and custom aerosol white-label needs.
            </p>

            <div className="space-y-4 text-xs font-semibold text-ink/85">
              <div className="flex items-center space-x-3.5">
                <div className="p-2 border border-border rounded-xl bg-white/70">
                  <Mail className="w-4 h-4 text-ink" />
                </div>
                <span>wholesale@spraylite.com</span>
              </div>
              <div className="flex items-center space-x-3.5">
                <div className="p-2 border border-border rounded-xl bg-white/70">
                  <Phone className="w-4 h-4 text-ink" />
                </div>
                <span>+1 (800) 555-SPRAY</span>
              </div>
              <div className="flex items-center space-x-3.5">
                <div className="p-2 border border-border rounded-xl bg-white/70">
                  <MapPin className="w-4 h-4 text-ink" />
                </div>
                <span>Velasquez Ave, Los Angeles, CA 90025</span>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <form 
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
                <input required type="text" placeholder="John Carter" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold" />
              </div>
              <div>
                <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Company / Restaurant</label>
                <input required type="text" placeholder="Gourmet Delights" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold" />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Email Address</label>
              <input required type="email" placeholder="john@gourmet.com" className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold" />
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Estimated Canister Volume / Month</label>
              <select required className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold">
                <option value="100-500">100 - 500 cans</option>
                <option value="500-2000">500 - 2,000 cans</option>
                <option value="2000+">2,000+ cans</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Message Details</label>
              <textarea required rows="4" placeholder="Tell us about your kitchen or distribution channels..." className="w-full border border-border p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-ink font-semibold resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-ink text-paper py-3.5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-90 transition-all cursor-pointer shadow-md select-none border border-ink">
              SUBMIT B2B INQUIRY
            </button>
          </form>

        </div>
      </section>

      {/* Sleek footer */}
      <footer className="bg-ink text-paper py-16 border-t border-white/10 p-container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <h4 className="font-display font-black text-xl tracking-wider mb-2">SPRAY LITE</h4>
            <p className="text-[10px] text-paper/50 font-semibold tracking-wider">© 2026 SPRAY LITE CULINARY. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="flex items-center space-x-1.5 p-2.5 border border-white/15 hover:border-white/50 rounded-full text-paper/85 hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center space-x-1.5 p-2.5 border border-white/15 hover:border-white/50 rounded-full text-paper/85 hover:text-white transition-all">
              <Facebook className="w-4 h-4" />
            </a>
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
