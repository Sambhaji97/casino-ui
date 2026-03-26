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
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 flex-shrink-0 min-w-[72px] group"
      style={{
        background: isActive ? "rgba(230,57,70,0.12)" : "transparent",
        border: isActive ? "1px solid var(--accent)" : "1px solid transparent",
        color: isActive ? "var(--accent)" : "var(--text-secondary)",
      }}
    >
      {/* Category icon */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: "var(--bg-card)" }}
      >
        {category.slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.slug}
            alt={category.name}
            width={24}
            height={24}
            style={{ width: 24, height: 24, objectFit: "contain" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
            {category.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Category name */}
      <span
        className="text-center leading-tight font-medium"
        style={{ fontSize: "10px", whiteSpace: "nowrap" }}
      >
        {category.name}
      </span>

      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
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
