"use client";

import React, { useRef } from "react";
import { useCasino, Category } from "../context/CasinoContext";


function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={`category-tab-${category.id}`}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 transition-all duration-200 flex-shrink-0 group"
      style={{
        width: "110px",
        height: "105px",
        borderRadius: "16px",
        background: isActive 
          ? "linear-gradient(180deg, #373A43 0%, #1A1B20 100%)" 
          : "linear-gradient(180deg, #2D3038 0%, #17181D 100%)",
        border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
        opacity: isActive ? 1 : 0.7,
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
        (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? "1" : "0.7";
        (e.currentTarget as HTMLButtonElement).style.border = isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent";
      }}
    >
      {/* Category icon */}
      <div className="flex items-center justify-center h-10 w-10 overflow-hidden flex-shrink-0">
        {category.slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.slug}
            alt={category.name}
            width={32}
            height={32}
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-lg font-bold text-white">
            {category.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Category name */}
      <span
        className="text-center font-semibold leading-tight text-white mb-1"
        style={{ fontSize: "12px", WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {category.name}
      </span>
    </button>
  );
}

export default function CategoryTabs() {
  const { categories, selectedCategoryId, setSelectedCategoryId, isLoading } =
    useCasino();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div
        className="w-full px-4 py-3 flex gap-3 overflow-x-auto"
        style={{ background: "var(--bg-secondary)" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-16 h-16 rounded-lg animate-pulse"
            style={{ background: "var(--bg-card)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full relative"
      style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
    >
      <div
        ref={scrollRef}
        className="flex gap-1 px-4 py-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`
          .category-scroll::-webkit-scrollbar { display: none; }
        `}</style>
        {categories.map((cat) => (
          <CategoryTab
            key={cat.id}
            category={cat}
            isActive={selectedCategoryId === cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
