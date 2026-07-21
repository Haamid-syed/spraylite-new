import React from 'react';
import { motion } from 'framer-motion';

export default function Pillars() {
  return (
    <section id="pillars" className="py-28 border-t border-border bg-paper relative p-container">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16"
      >
        <div>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9] text-ink">
            ENGINEERED FOR THE<br />MODERN KITCHEN.
          </h2>
        </div>
        <p className="text-ink/65 text-xs md:text-sm font-semibold max-w-md mt-6 md:mt-0 leading-relaxed">
          Culinary innovation merging taste and portion control. Spray Lite delivers high-heat cooking performance with near-zero fat content per serving.
        </p>
      </motion.div>

      {/* ─── Asymmetric Bento Grid System ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── CARD 1 (Hero Bento - 7 cols wide): HEALTH DEFICIT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white text-ink border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Inset Dashed Frame */}
          <div className="absolute inset-3 border-2 border-dashed border-ink/10 rounded-2xl pointer-events-none z-10 group-hover:border-ink/25 transition-colors duration-300" />

          {/* Watermark digit */}
          <span className="absolute -top-6 -right-4 font-display font-black text-9xl text-ink/[0.04] pointer-events-none select-none z-0">
            01
          </span>

          <div>
            {/* Header Capsule */}
            <div className="flex justify-between items-center mb-8 relative z-20">
              <div className="bg-ink text-paper px-4 py-1.5 rounded-full inline-flex items-center space-x-2.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
                <span className="font-display font-black text-[11px] tracking-wider uppercase">01 / HEALTH DEFICIT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
              </div>
              <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                98% FAT REDUCTION
              </span>
            </div>

            {/* Title & Copy */}
            <div className="relative z-20 mb-8 max-w-xl">
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-wider mb-3 text-ink">
                ELIMINATE UNHEALTHY COOKING GREASE
              </h3>
              <p className="text-xs md:text-sm text-ink/70 font-medium leading-relaxed">
                A standard tablespoon of traditional pouring oil packs 115 calories and 14g of fat. Spray Lite coats your pan evenly with under 1.5 calories and less than 0.25g of fat per spray.
              </p>
            </div>
          </div>

          {/* Live Calorie Comparison Visual Bar */}
          <div className="relative z-20 bg-ink/[0.03] border border-border p-5 rounded-2xl backdrop-blur-sm mt-4">
            <div className="flex justify-between text-[9px] font-extrabold tracking-widest uppercase text-ink/50 mb-3">
              <span>CALORIE IMPACT COMPARISON (PER MEAL)</span>
              <span>113.5 KCAL SAVED</span>
            </div>

            {/* Bar 1: Pouring Oil */}
            <div className="mb-3">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-500">Traditional Pouring Oil (1 Spoon)</span>
                <span className="text-red-500 font-black">115.0 kcal</span>
              </div>
              <div className="w-full h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-full" />
              </div>
            </div>

            {/* Bar 2: Spray Lite */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-600">Spray Lite (1 Spray)</span>
                <span className="text-emerald-600 font-black">1.5 kcal</span>
              </div>
              <div className="w-full h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[2.5%]" />
              </div>
            </div>
          </div>

        </motion.div>


        {/* ── CARD 2 (5L Economy - 5 cols wide): 5L EFFICIENCY ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 bg-white border border-border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Dashed Frame */}
          <div className="absolute inset-3 border-2 border-dashed border-ink/10 rounded-2xl pointer-events-none z-10 group-hover:border-ink/25 transition-colors duration-300" />

          {/* Watermark digit */}
          <span className="absolute -top-6 -right-4 font-display font-black text-9xl text-ink/[0.04] pointer-events-none select-none z-0">
            02
          </span>

          <div>
            <div className="bg-ink text-paper px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2 mb-6 relative z-20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
              <span className="font-display font-black text-[10px] tracking-wider uppercase">02 / 5L ECONOMY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
            </div>

            <h3 className="font-display font-black text-xl uppercase tracking-wider mb-2 text-ink relative z-20">
              ONE CANISTER REPLACES 5 LITRES
            </h3>
            <p className="text-xs text-ink/70 font-medium leading-relaxed relative z-20 mb-6">
              Precision aerosol valves prevent over-pouring and pool accumulation, giving you over 1,000 controlled sprays per bottle.
            </p>
          </div>

          {/* Graphic Badge */}
          <div className="relative z-20 bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-500 text-paper rounded-xl font-black text-xs">
                5L
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest text-ink/50 uppercase block">VOLUME EQUIVALENT</span>
                <span className="text-xs font-black text-ink uppercase tracking-wider">Replaces 5 Standard Oil Bottles</span>
              </div>
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-amber-500/20 text-amber-700 px-2.5 py-1 rounded-full border border-amber-500/30">
              1:5 RATIO
            </span>
          </div>

        </motion.div>


        {/* ── CARD 3 (Proprietary Tech - 5 cols wide): FORMULATION ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 bg-white border border-border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Dashed Frame */}
          <div className="absolute inset-3 border-2 border-dashed border-ink/10 rounded-2xl pointer-events-none z-10 group-hover:border-ink/25 transition-colors duration-300" />

          {/* Watermark digit */}
          <span className="absolute -top-6 -right-4 font-display font-black text-9xl text-ink/[0.04] pointer-events-none select-none z-0">
            03
          </span>

          <div>
            <div className="bg-ink text-paper px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2 mb-6 relative z-20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
              <span className="font-display font-black text-[10px] tracking-wider uppercase">03 / PROPRIETARY FORMULA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
            </div>

            <h3 className="font-display font-black text-xl uppercase tracking-wider mb-2 text-ink relative z-20">
              NON-STICK NO-CLOG TECHNOLOGY
            </h3>
            <p className="text-xs text-ink/70 font-medium leading-relaxed relative z-20 mb-6">
              Formulated with high-grade soy lecithin emulsifiers and pure propellant for an unbroken micro-film mist every single time.
            </p>
          </div>

          {/* Micro Formula Chips */}
          <div className="relative z-20 grid grid-cols-3 gap-2">
            {[
              { title: "SOY LECITHIN", desc: "Anti-Stick" },
              { title: "ZERO RESIDUE", desc: "Clean Pan" },
              { title: "MICRO MIST", desc: "Even Coat" }
            ].map((chip, i) => (
              <div key={i} className="bg-ink/[0.03] border border-border p-2.5 rounded-xl text-center">
                <span className="text-[8px] font-black tracking-widest text-ink/80 block uppercase">{chip.title}</span>
                <span className="text-[7px] font-bold text-ink/40 block uppercase">{chip.desc}</span>
              </div>
            ))}
          </div>

        </motion.div>


        {/* ── CARD 4 (Versatility - 7 cols wide): 10 PRODUCT VARIANTS ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Dashed Frame */}
          <div className="absolute inset-3 border-2 border-dashed border-ink/10 rounded-2xl pointer-events-none z-10 group-hover:border-ink/25 transition-colors duration-300" />

          {/* Watermark digit */}
          <span className="absolute -top-6 -right-4 font-display font-black text-9xl text-ink/[0.04] pointer-events-none select-none z-0">
            04
          </span>

          <div>
            <div className="flex justify-between items-center mb-6 relative z-20">
              <div className="bg-ink text-paper px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
                <span className="font-display font-black text-[10px] tracking-wider uppercase">04 / CULINARY VERSATILITY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-paper/40 block" />
              </div>
              <span className="text-xs font-black tracking-widest text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase">
                10 SPECIALLY CRAFTED VARIANTS
              </span>
            </div>

            <h3 className="font-display font-black text-2xl uppercase tracking-wider mb-2 text-ink relative z-20">
              FROM EVERYDAY BAKING TO HIGH-HEAT SEARING
            </h3>
            <p className="text-xs text-ink/70 font-medium leading-relaxed relative z-20 mb-6 max-w-lg">
              Tailored oil blends for every cooking method — including gourmet Extra Virgin Olive, high-smoke Avocado, Butter grill coat, and specialized Airfryer Groundnut.
            </p>
          </div>

          {/* Flavor Pill Matrix */}
          <div className="relative z-20 flex flex-wrap gap-2 pt-2">
            {[
              { name: "Olive Oil", color: "#8D9973" },
              { name: "Butter Flavor", color: "#F59E0B" },
              { name: "Avocado Oil", color: "#4CAF7D" },
              { name: "Sesame Oil", color: "#B45309" },
              { name: "Airfryer Groundnut", color: "#D97706" },
              { name: "Pan Release Baking", color: "#6366F1" },
            ].map((variant, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-full border border-border bg-white text-[9px] font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: variant.color }} />
                <span className="text-ink/80">{variant.name}</span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>

    </section>
  );
}
