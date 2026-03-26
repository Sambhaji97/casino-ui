"use client";

import React from "react";
import { useCasino } from "../context/CasinoContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useCasino();

  return (
    <div
      style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
      className="w-full px-4 py-3 flex items-center gap-3"
    >
      {/* Search Input */}
      <div
        className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--text-muted)", flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          id="search-games-input"
          type="text"
          placeholder="Search Your Game"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none w-full text-sm"
          style={{ color: "var(--text-primary)" }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{ color: "var(--text-muted)" }}
            className="flex-shrink-0 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Providers Dropdown */}
      <button
        id="providers-filter-btn"
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <span>Providers</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Filters Dropdown */}
      <button
        id="filters-btn"
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <span>Filters</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
