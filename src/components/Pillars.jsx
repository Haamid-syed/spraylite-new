import React from 'react';
import { ShieldCheck, TrendingDown, Layers, Zap } from 'lucide-react';

export default function Pillars() {
  const pillars = [
    {
      id: "01",
      title: "HEALTH DEFICIT",
      icon: <TrendingDown className="w-5 h-5 text-emerald-600" />,
      description: "Drastically reduce calorie intake. A standard spoon of pouring oil contains 115 calories, whereas a single spray of Spray Lite is less than 1.5 calories and under 0.25g of fat.",
      stat: "98% Fat Reduction"
    },
    {
      id: "02",
      title: "5L ECONOMY",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      description: "Precision nozzle ensures zero wastage. One single canister pack packs approximately 5 Litres of standard cooking oil, effectively replacing tablespoons of oil with single sprays.",
      stat: "1 Can = 5L Oil"
    },
    {
      id: "03",
      title: "AMERICAN TECH",
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      description: "Uses a specialized American formulation with non-clogging nozzles. Combines high-quality oil, soy lecithin, water, and pure propellant for an even, non-stick pan coat.",
      stat: "0% Sticky Residue"
    },
    {
      id: "04",
      title: "VERSATILITY",
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      description: "Caters to every type of recipe. Ranging from everyday Sunflower Oil, to gourmet Olive Oil, Coconut, Butter Flavored grill coats, and specialized Airfryer Groundnut.",
      stat: "10 Product Variants"
    }
  ];

  return (
    <section id="pillars" className="py-24 border-t border-border bg-paper relative p-container">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase block mb-3">OUR CORE PILLARS</span>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none text-ink">
            Revolutionizing the<br />modern kitchen.
          </h2>
        </div>
        <p className="text-ink/60 text-xs md:text-sm font-semibold max-w-sm mt-6 md:mt-0 leading-relaxed">
          Culinary innovation that merges taste and portion control. We engineered Spray Lite to deliver premium cooking results without traditional oil grease.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => (
          <div 
            key={pillar.id}
            className="group relative border border-border p-8 rounded-2xl bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Top Indicator */}
            <div className="flex justify-between items-start mb-6">
              <span className="font-display font-black text-4xl text-ink/10 group-hover:text-ink/20 transition-colors">
                {pillar.id}
              </span>
              <div className="p-2 rounded-xl bg-ink/[0.03] border border-border group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-300">
                {pillar.icon}
              </div>
            </div>

            {/* Description Text */}
            <div className="mb-8">
              <h3 className="font-display font-black text-lg tracking-wider uppercase text-ink mb-3">
                {pillar.title}
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>

            {/* Accent Footer Stat */}
            <div className="border-t border-border pt-4 mt-auto">
              <span className="text-[10px] font-bold tracking-widest text-ink/50 uppercase block mb-1">PROVEN VALUE</span>
              <span className="text-xs font-black text-ink uppercase tracking-wider">{pillar.stat}</span>
            </div>
            
            {/* Subtle decorative hover element */}
            <div className="absolute bottom-0 right-0 w-1.5 h-full bg-ink/10 group-hover:bg-ink transition-colors duration-300" />
          </div>
        ))}
      </div>

    </section>
  );
}
