"use client";

import React from "react";
import { useCasino } from "../context/CasinoContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useCasino();

  return (
    <div
      style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
      className="w-full px-4 py-3 flex flex-col sm:flex-row items-center gap-3"
    >
      {/* Search Input */}
      <div
        className="w-full sm:flex-1 flex items-center gap-3 px-4 py-2 rounded-lg"
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

      <div className="flex w-full sm:w-auto items-center gap-3">
        {/* Providers Dropdown */}
        <div className="relative h-[38px] flex-1 sm:w-36">
          <select
            id="providers-filter-select"
            className="appearance-none flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors pr-10 outline-none w-full h-full cursor-pointer"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              colorScheme: "dark",
            }}
          >
            <option value="">Providers</option>
            <option value="evolution">Evolution</option>
            <option value="pragmatic">Pragmatic Play</option>
            <option value="playngo">Play'n GO</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
              style={{ color: "var(--text-secondary)" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Filters Dropdown */}
        <div className="relative h-[38px] flex-1 sm:w-36">
          <select
            id="filters-select"
            className="appearance-none flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors pr-10 outline-none w-full h-full cursor-pointer"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              colorScheme: "dark",
            }}
          >
            <option value="">Filters</option>
            <option value="jackpots">Jackpots</option>
            <option value="megaways">Megaways</option>
            <option value="new">New Games</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
              style={{ color: "var(--text-secondary)" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
