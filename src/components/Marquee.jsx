import React, { useState } from 'react';

const reviews = [
  { text: "98% fat deficit is a complete game changer", author: "Sarah K., Fitness Coach" },
  { text: "The Butter flavor spray makes egg toasts incredible", author: "Marcus T." },
  { text: "Replacing 5L of heavy cooking oil with one can", author: "Elena G., Home Cook" },
  { text: "Avocado Oil is perfect for high-heat searing", author: "Chef Ananya M." },
  { text: "No clog nozzles. Works every single time", author: "Jason R." },
  { text: "Sesame spray on noodles is absolutely transformative", author: "Li W." },
  { text: "Saved thousands of calories this month alone", author: "@nourished" },
  { text: "0% cholesterol, 100% flavor. That is Spray Lite.", author: "Dr. Reena V." },
  { text: "My air fryer results are night and day better", author: "Mark H." },
  { text: "Ghee spray on parathas — incredible aroma", author: "Priya S." },
];

const doubleTrack = [...reviews, ...reviews];

function Dot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-paper/30 mx-8 shrink-0 align-middle"
      aria-hidden="true"
    />
  );
}

export default function Marquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-ink text-paper py-7 overflow-hidden select-none border-y border-white/10 relative group cursor-pointer"
    >
      {/* Fade-out gradient masks on both edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />

      {/* Pause indicator hint badge */}
      <div className="absolute top-2 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[8px] font-extrabold tracking-widest uppercase bg-white/10 text-paper/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
          PAUSED
        </span>
      </div>

      {/* Single, continuous scrolling track — pauses on hover */}
      <div className="flex w-max overflow-hidden">
        <div
          className="flex items-center shrink-0"
          style={{
            animation: 'marqueeScroll 75s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {doubleTrack.map((rev, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <Dot />
              <span className="text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap text-paper/85">
                "{rev.text}"
              </span>
              <span className="text-[10px] font-bold ml-2.5 uppercase tracking-widest whitespace-nowrap text-paper/40">
                — {rev.author}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
