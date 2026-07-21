import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckoutClick 
}) {
  
  // Calculate pricing subtotals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Calculate total saved calories as a fun wellness metric
  const totalSavedCalories = cartItems.reduce((acc, item) => {
    if (item.category === "Bundle") {
      // Estimate calories saved for bundles (e.g., 3-pack or 6-pack estimations)
      return acc + (item.id === "trio-bundle" ? 1200 : 2500) * item.quantity;
    }
    const traditional = item.caloriesTraditional || 115;
    const spray = item.caloriesSpray || 1.4;
    // Assume each tablespoon replacement represents 10 uses per bottle purchase
    return acc + Math.round((traditional - spray) * 10 * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
          />

          {/* Drawer Body - Slides from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-paper border-l border-border z-50 shadow-2xl flex flex-col justify-between"
          >
            
            {/* Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-ink" />
                <h3 className="font-display font-black text-xl uppercase tracking-wider text-ink">YOUR BAG</h3>
                <span className="bg-ink text-paper text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 border border-border rounded-full hover:bg-ink hover:text-paper transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-ink/40">
                  <ShoppingBag className="w-12 h-12 stroke-[1.5] mb-4" />
                  <p className="font-display font-bold text-sm tracking-widest uppercase">YOUR BAG IS EMPTY</p>
                  <p className="text-xs mt-2 max-w-[200px]">Add premium culinary sprays below to start cooking healthier.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center bg-white border border-border p-4 rounded-xl shadow-sm justify-between relative overflow-hidden"
                  >
                    
                    {/* Item Details */}
                    <div className="flex-grow">
                      <span className="text-[8px] uppercase tracking-widest text-ink/40 font-bold">{item.category}</span>
                      <h4 className="font-display font-black text-sm uppercase tracking-wide text-ink mt-0.5">{item.name}</h4>
                      <p className="text-xs font-black text-ink mt-1">${item.price}</p>
                    </div>

                    {/* Quantity & Trash controls */}
                    <div className="flex items-center space-x-3">
                      
                      {/* Plus/Minus Toggles */}
                      <div className="flex items-center border border-border rounded-full bg-paper p-0.5">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-ink/5 rounded-full transition-colors cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 text-ink/70" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center select-none">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-ink/5 rounded-full transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-ink/70" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 border border-border hover:border-red-200 hover:text-red-500 rounded-full transition-all cursor-pointer hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-border shadow-inner">
                
                {/* Calorie savings strip */}
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center space-x-2.5 mb-4 text-emerald-800 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 animate-pulse" />
                  <span>Calorie savings: <strong>{totalSavedCalories} kcal</strong> compared to pouring oil!</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-black text-sm tracking-wider uppercase text-ink/50">SUBTOTAL</span>
                  <span className="font-display font-black text-2xl text-ink">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={onCheckoutClick}
                  className="w-full bg-ink text-paper py-4 rounded-xl font-bold tracking-widest text-xs hover:bg-opacity-95 transition-all select-none cursor-pointer active:scale-98 text-center block shadow-md border border-ink"
                >
                  SECURE CHECKOUT
                </button>
                
                <p className="text-[9px] text-center text-ink/40 font-bold tracking-wider mt-3">
                  SHIPPING & TAXES CALCULATED AT STEP 2
                </p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
