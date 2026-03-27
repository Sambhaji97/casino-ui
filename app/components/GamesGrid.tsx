"use client";

import React from "react";
import { useCasino } from "../context/CasinoContext";
import GameCard from "./GameCard";

export default function GamesGrid() {
  const { filteredGames, isLoading, selectedCategoryId, categories, searchQuery } =
    useCasino();

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const [visibleCount, setVisibleCount] = React.useState(24);

  React.useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategoryId, searchQuery]);

  if (isLoading) {
    return (
      <div
        className="w-full px-4 py-4"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl animate-pulse"
              style={{
                background: "var(--bg-card)",
                aspectRatio: "3/4",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  const displayedGames = filteredGames.slice(0, visibleCount);

  return (
    <div className="w-full px-4 py-4" style={{ background: "var(--bg-primary)" }}>
      {/* Header row: ← All Games / category name and count */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            id="back-to-categories-btn"
            onClick={() => {}}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <h2 className="text-lg font-bold text-white">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory
              ? selectedCategory.name
              : "All Games"}
          </h2>
        </div>

        <span
          className="ml-auto text-sm font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "var(--bg-card)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
        >
          {filteredGames.length} games
        </span>
      </div>

      {/* Games grid */}
      {filteredGames.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "var(--bg-card)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <p style={{ color: "var(--text-secondary)" }}>No games found</p>
        </div>
      ) : (
        <>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
          >
            {displayedGames.map((game, index) => (
              <GameCard key={game.id} game={game} priority={index < 6} />
            ))}
          </div>

          {visibleCount < filteredGames.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                }}
              >
                Load More Games
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
