import React, { useState } from 'react';
import { motion } from 'framer-motion';

const renderVectorIcon = (id) => {
  const props = { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", strokeWidth: "2" };
  switch (id) {
    case "olive-oil":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 2C8.5 6.5 8.5 12 12 15C15.5 12 15.5 6.5 12 2Z"/>
          <path d="M12 8C10.5 11 10.5 14 12 17C13.5 14 13.5 11 12 8Z" opacity="0.6"/>
          <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      );
    case "butter":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M4 11h16v7H4z"/>
          <path d="M7 11V7c0-.5.5-1 1-1h8c.5 0 1 .5 1 1v4" opacity="0.6"/>
          <path d="M10 11V9m4 2V9"/>
        </svg>
      );
    case "avocado":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 2C9 5 7.5 9 7.5 13.5a4.5 4.5 0 0 0 9 0C16.5 9 15 5 12 2Z"/>
          <circle cx="12" cy="14.5" r="2" fill="currentColor"/>
        </svg>
      );
    case "coconut":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="12" r="8"/>
          <path d="M12 4a8 8 0 0 1 0 16" opacity="0.5"/>
          <path d="M8 12h8"/>
          <circle cx="12" cy="12" r="5" strokeDasharray="2 2"/>
        </svg>
      );
    case "natural-sunflower":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10l2 2M5 19l2-2m10-10l2-2"/>
        </svg>
      );
    case "sesame":
    case "ricebran":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M12 22V8"/>
          <path d="M8 8c1.5-1 3.5-1 4 0"/>
          <path d="M16 8c-1.5-1-3.5-1-4 0"/>
          <path d="M8 13c1.5-1 3.5-1 4 0"/>
          <path d="M16 13c-1.5-1-3.5-1-4 0"/>
        </svg>
      );
    case "ghee":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10Z"/>
          <path d="M8 10V6a2 2 0 0 1 4 0v4"/>
          <path d="M9 10h6"/>
        </svg>
      );
    case "groundnut":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M9.5 7.5a3 3 0 0 0-1.5 5.5 3.5 3.5 0 0 1 0 2 3 3 0 0 0 1.5 5.5 3 3 0 0 0 3.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 3 3 0 0 0 3.5 1.5 3 3 0 0 0 1.5-5.5 3.5 3.5 0 0 1 0-2A3 3 0 0 0 18 7.5Z"/>
        </svg>
      );
    case "pan-release":
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M3 15h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z"/>
          <path d="M5 15V8a4 4 0 0 1 8 0v7m-3-7v7m6-4v4" opacity="0.6"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function BottleRender({ product, active = false, size = "md" }) {
  const [isHovered, setIsHovered] = useState(false);

  // Responsive scale factor based on size prop
  const sizeClasses = {
    sm: "h-[220px] w-[70px]",
    md: "h-[360px] w-[110px]",
    lg: "h-[480px] w-[145px]"
  };

  // Color helper mappings for vector details
  const getCapColor = () => {
    switch (product.id) {
      case "olive-oil": return "bg-[#5D6B49]";
      case "butter": return "bg-[#DFBE73]";
      case "avocado": return "bg-[#495B3D]";
      case "coconut": return "bg-[#9FB4AD]";
      case "natural-sunflower": return "bg-[#D5AA54]";
      case "sesame": return "bg-[#AB8561]";
      case "ghee": return "bg-[#C4952D]";
      case "groundnut": return "bg-[#BD8963]";
      case "pan-release": return "bg-[#C28479]";
      case "ricebran": return "bg-[#8CAAB0]";
      default: return "bg-zinc-700";
    }
  };

  // Particle animation variants for the mist spray
  const particleCount = 12;
  const particles = Array.from({ length: particleCount });

  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Spray Mist Particle Emitter */}
      {isHovered && (
        <div className="absolute -top-12 -right-8 w-24 h-24 pointer-events-none overflow-visible z-30">
          {/* Nozzle mist origin */}
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 blur-[1px] rounded-full" />
          
          {/* Moving spray particles */}
          {particles.map((_, i) => {
            const angle = -25 - (i * 5); // Angle spread upwards and to the right
            const distance = 40 + Math.random() * 50;
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * distance;
            const ty = Math.sin(rad) * distance;

            return (
              <motion.div
                key={i}
                className="absolute bottom-8 left-8 rounded-full bg-white/80 blur-[2px]"
                style={{
                  width: 3 + Math.random() * 6,
                  height: 3 + Math.random() * 6,
                }}
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 0.5 }}
                animate={{
                  x: tx,
                  y: ty,
                  opacity: 0,
                  scale: 2.5
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.2,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Main Bottle Container */}
      <div className={`relative ${sizeClasses[size]} flex flex-col justify-end transition-transform duration-500`}>
        
        {/* Cap Assembly */}
        <div className="absolute top-0 left-[10%] w-[80%] h-[12%] flex flex-col items-center z-15">
          {/* Nozzle button tip */}
          <div className="w-[45%] h-[20%] bg-zinc-400 rounded-t-sm shadow-inner" />
          
          {/* Spray Spray Nozzle opening (little black dot on the side) */}
          <div className={`relative w-[95%] h-[80%] ${getCapColor()} rounded-t-[10px] border-b border-black/10 overflow-hidden`}>
            {/* Cylindrical shine on cap */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-black/30 pointer-events-none" />
            
            {/* The little nozzle outlet dot */}
            <div className="absolute top-3 right-1 w-[5px] h-[3px] bg-zinc-950 rounded-full" />
          </div>
          
          {/* Neck ring */}
          <div className="w-[100%] h-[15%] bg-zinc-300 border-t border-b border-black/15 shadow-sm" />
        </div>

        {/* Canister Body */}
        <div className={`relative w-full h-[88%] ${product.accent} rounded-t-[14px] rounded-b-[18px] border border-black/10 shadow-lg overflow-hidden flex flex-col items-center justify-between py-6 z-10`}>
          
          {/* 3D Cylindrical Shading Overlays (Specual Highlight & Shadow) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute top-0 left-[20%] w-[12%] h-full bg-gradient-to-r from-white/25 via-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-[26%] w-[2%] h-full bg-white/20 pointer-events-none" />
          
          {/* Inset Border Detail */}
          <div className="absolute inset-2 border border-white/15 rounded-t-[8px] rounded-b-[12px] pointer-events-none" />

          {/* Label Branding */}
          <div className="w-full text-center flex flex-col items-center justify-between h-full px-2 py-1 text-white z-20">
            {/* Top Text */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-white/70">
                American Formulation
              </span>
              <h3 className="text-sm font-extrabold tracking-wider mt-1 font-display">
                SPRAY LITE
              </h3>
              {/* Divider */}
              <div className="w-6 h-[1.5px] bg-white/40 my-1" />
            </div>

            {/* Middle Main Icon & Product Details */}
            <div className="flex flex-col items-center">
              {/* Specialized Vector Details Per Product */}
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-1 shadow-inner">
                {renderVectorIcon(product.id)}
              </div>
              <h2 className="text-xs font-black uppercase tracking-wider font-display max-w-[85px] leading-tight text-center">
                {product.name.replace("Gourmet ", "").replace("Rich ", "").replace("Pure ", "").replace("Everyday ", "").replace("Oriental ", "").replace("Premium ", "")}
              </h2>
              <span className="text-[7px] uppercase tracking-widest text-white/80 font-bold mt-0.5">
                {product.category}
              </span>
            </div>

            {/* Bottom Metrics */}
            <div className="flex flex-col items-center w-full">
              {/* Energy Badge */}
              <div className="bg-black/20 backdrop-blur-sm border border-white/15 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider mb-2">
                &lt;1.5 CALORIES
              </div>
              <div className="flex justify-between w-full px-3 text-[7px] text-white/60 font-semibold border-t border-white/10 pt-1.5">
                <span>0% CHOLESTEROL</span>
                <span>200ML</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom metal rim */}
        <div className="absolute -bottom-1 w-[96%] left-[2%] h-[6px] bg-zinc-400 rounded-b-md border-t border-black/20 shadow-inner z-5" />
      </div>
    </div>
  );
}
