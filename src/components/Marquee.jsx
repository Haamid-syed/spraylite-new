import React from 'react';

export default function Marquee() {
  const reviews = [
    { text: "98% fat deficit is a complete game changer", author: "Sarah K. (Fitness Coach)" },
    { text: "The Butter flavor spray makes egg toasts incredible", author: "Marcus T." },
    { text: "Replacing 5L of heavy cooking oil with one can. Value is insane", author: "Elena G. (Home Cook)" },
    { text: "Absolutely essential air-frying groundnut spray", author: "David D." },
    { text: "Premium non-stick releasing for muffin tins", author: "Baker Bakers Co." },
    { text: "No chemical clog nozzles. Works every single time", author: "Jason R." }
  ];

  // Duplicate items to ensure a seamless infinite scrolling ribbon loop
  const ribbonItems = [...reviews, ...reviews, ...reviews];

  return (
    <section className="bg-ink text-paper py-8 overflow-hidden select-none border-t border-b border-white/10 relative">
      
      {/* Scrollable Track container */}
      <div className="flex whitespace-nowrap overflow-hidden">
        
        {/* Animated strip container using tailwind marquee configurations */}
        <div className="flex animate-marquee space-x-12 shrink-0">
          {ribbonItems.map((rev, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 text-sm font-semibold tracking-wider uppercase"
            >
              <span className="text-amber-400">★</span>
              <span>"{rev.text}"</span>
              <span className="text-paper/40 font-bold">&mdash; {rev.author}</span>
              <span className="text-paper/20 select-none px-4">|</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
