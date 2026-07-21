import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CreditCard, CheckCircle2, ArrowRight, Check } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  const [step, setStep] = useState(1); // Steps: 1 (Shipping), 2 (Payment), 3 (Success)
  
  // Form states
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNum: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!shippingForm.name.trim()) tempErrors.name = "Full Name is required";
    if (!shippingForm.email.trim()) tempErrors.email = "Email Address is required";
    if (!shippingForm.address.trim()) tempErrors.address = "Address is required";
    if (!shippingForm.city.trim()) tempErrors.city = "City is required";
    if (!shippingForm.zip.trim()) tempErrors.zip = "Zip Code is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (paymentForm.cardNum.replace(/\s+/g, '').length !== 16) tempErrors.cardNum = "Invalid 16-digit Card Number";
    if (!paymentForm.cardExpiry.trim()) tempErrors.cardExpiry = "Expiry Date is required";
    if (paymentForm.cardCvc.length !== 3) tempErrors.cardCvc = "CVC must be 3 digits";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      setStep(3);
      onClearCart(); // Reset cart state on order success
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ cubicBezier: [0.16, 1, 0.3, 1], duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} // Stop overlay dismissal
              className="bg-paper border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[550px]"
            >
              
              {/* Left Panel: Step and Form Details */}
              <div className="w-full md:w-[60%] p-6 flex flex-col justify-between h-full bg-white overflow-y-auto no-scrollbar">
                
                {/* Header & Steps Indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="font-display font-black text-xl uppercase tracking-wider text-ink">SECURE CHECKOUT</h3>
                    
                    {/* Visual step tracker */}
                    <div className="flex items-center mt-3 space-x-0">
                      {[
                        { num: 1, label: "SHIPPING" },
                        { num: 2, label: "PAYMENT" },
                        { num: 3, label: "COMPLETE" }
                      ].map((s, idx) => (
                        <React.Fragment key={s.num}>
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black transition-all duration-300 border ${
                                step >= s.num
                                  ? "bg-ink text-paper border-ink"
                                  : "bg-white text-ink/30 border-border"
                              }`}
                            >
                              {step > s.num
                                ? <Check className="w-3 h-3" />
                                : s.num
                              }
                            </div>
                            <span className={`text-[8px] font-bold tracking-wider mt-1 transition-colors duration-300 ${step >= s.num ? "text-ink" : "text-ink/30"}`}>
                              {s.label}
                            </span>
                          </div>
                          {idx < 2 && (
                            <div className="flex-1 h-[1.5px] mx-1.5 mb-3 bg-border overflow-hidden rounded-full">
                              <div
                                className="h-full bg-ink transition-all duration-500 ease-out"
                                style={{ width: step > s.num ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {step < 3 && (
                    <button 
                      onClick={onClose}
                      className="p-1.5 border border-border rounded-full hover:bg-ink hover:text-paper cursor-pointer transition-colors ml-4 mt-0.5 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Step 1: Shipping Address Form */}
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Jane Doe" 
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({...shippingForm, name: e.target.value})}
                          className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                        />
                        {errors.name && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.name}</span>}
                      </div>

                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="jane@example.com" 
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                          className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                        />
                        {errors.email && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.email}</span>}
                      </div>

                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Delivery Address</label>
                        <input 
                          type="text" 
                          placeholder="123 Culinary Way" 
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                          className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                        />
                        {errors.address && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.address}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">City</label>
                          <input 
                            type="text" 
                            placeholder="New York" 
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                            className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                          />
                          {errors.city && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.city}</span>}
                        </div>
                        <div>
                          <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Zip Code</label>
                          <input 
                            type="text" 
                            placeholder="10001" 
                            value={shippingForm.zip}
                            onChange={(e) => setShippingForm({...shippingForm, zip: e.target.value})}
                            className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                          />
                          {errors.zip && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.zip}</span>}
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-ink text-paper py-3 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-95 mt-6 cursor-pointer flex items-center justify-center space-x-1 border border-ink active:scale-98"
                    >
                      <span>GO TO PAYMENT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}

                {/* Step 2: Payment Details */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Interactive sleek credit card card */}
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 rounded-xl text-white shadow-md relative overflow-hidden flex flex-col justify-between h-[110px] mb-4">
                        <div className="flex justify-between items-start">
                          <CreditCard className="w-6 h-6 opacity-80" />
                          <span className="text-[8px] tracking-widest font-black uppercase text-white/50">SPRAY LITE PAY</span>
                        </div>
                        
                        <span className="font-mono text-sm tracking-widest text-white/80 block py-2 select-all">
                          {paymentForm.cardNum ? paymentForm.cardNum.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                        </span>
                        
                        <div className="flex justify-between text-[8px] text-white/60 font-semibold tracking-wider">
                          <span>{shippingForm.name.toUpperCase() || 'HOLDER NAME'}</span>
                          <span>{paymentForm.cardExpiry || 'MM/YY'}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Card Number</label>
                        <input 
                          type="text" 
                          maxLength="16"
                          placeholder="4111 2222 3333 4444" 
                          value={paymentForm.cardNum}
                          onChange={(e) => setPaymentForm({...paymentForm, cardNum: e.target.value.replace(/\D/g, '')})}
                          className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                        />
                        {errors.cardNum && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.cardNum}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">Expiry Date</label>
                          <input 
                            type="text" 
                            maxLength="5"
                            placeholder="MM/YY" 
                            value={paymentForm.cardExpiry}
                            onChange={(e) => setPaymentForm({...paymentForm, cardExpiry: e.target.value})}
                            className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                          />
                          {errors.cardExpiry && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.cardExpiry}</span>}
                        </div>
                        <div>
                          <label className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block mb-1">CVC</label>
                          <input 
                            type="password" 
                            maxLength="3"
                            placeholder="123" 
                            value={paymentForm.cardCvc}
                            onChange={(e) => setPaymentForm({...paymentForm, cardCvc: e.target.value.replace(/\D/g, '')})}
                            className="w-full border border-border p-2.5 rounded-xl text-xs bg-paper focus:outline-none focus:border-ink font-semibold"
                          />
                          {errors.cardCvc && <span className="text-[9px] font-bold text-red-500 tracking-wider">{errors.cardCvc}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="w-[35%] border border-border text-ink/75 hover:text-ink hover:border-ink/50 py-3 rounded-xl font-bold tracking-widest text-[9px] cursor-pointer text-center"
                      >
                        BACK
                      </button>
                      <button 
                        type="submit" 
                        className="w-[65%] bg-ink text-paper py-3 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-95 cursor-pointer flex items-center justify-center space-x-2 border border-ink active:scale-98"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>AUTHORISE PAY</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Checkout Success */}
                {step === 3 && (
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-8">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-emerald-600 stroke-[1.5]" />
                    </motion.div>
                    
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider text-ink mt-2">
                      ORDER CONFIRMED!
                    </h3>
                    <p className="text-xs text-ink/70 max-w-[220px] leading-relaxed">
                      Thank you for cooking with <strong>Spray Lite</strong>. Your simulated payment was processed securely.
                    </p>

                    <div className="bg-paper border border-border p-4 rounded-xl w-full text-left space-y-1.5 text-[10px] font-medium text-ink/80 mt-4 shadow-sm">
                      <p><strong>Order ID:</strong> SL-{(100000 + Math.floor(Math.random() * 900000))}</p>
                      <p><strong>Recipient:</strong> {shippingForm.name}</p>
                      <p><strong>Delivery:</strong> {shippingForm.address}, {shippingForm.city}</p>
                      <p><strong>Method:</strong> Standard Express Delivery (2-4 days)</p>
                    </div>

                    <button
                      onClick={onClose}
                      className="w-full bg-ink text-paper py-3.5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-opacity-90 cursor-pointer shadow-md border border-ink active:scale-98"
                    >
                      CONTINUE COOKING
                    </button>
                  </div>
                )}

              </div>

              {/* Right Panel: Shopping Summary */}
              <div className="hidden md:flex w-[40%] bg-[#F5EAD6]/30 border-l border-border p-6 flex-col justify-between h-full">
                
                <div>
                  <h4 className="font-display font-black text-xs tracking-wider uppercase text-ink/50 mb-4">ORDER SUMMARY</h4>
                  <div className="space-y-3.5 max-h-[280px] overflow-y-auto no-scrollbar pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-[10px] font-semibold text-ink">
                        <div className="max-w-[70%]">
                          <p className="uppercase truncate">{item.name}</p>
                          <p className="text-ink/50 text-[9px]">Qty: {item.quantity}</p>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-[10px] text-ink/60 font-semibold">
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-ink/60 font-semibold">
                    <span>SHIPPING</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-display font-black text-sm text-ink border-t border-border pt-3">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
