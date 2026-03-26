"use client";

import React from "react";
import Link from "next/link";
import { useCasino } from "../context/CasinoContext";
import GameCard from "./GameCard";

export default function TopSlotsSection() {
  const { topSlots, isLoadingSlots } = useCasino();

  const displaySlots = topSlots.slice(0, 10);

  return (
    <section
      id="top-slots-section"
      className="w-full px-4 py-6"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Fire icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(230,57,70,0.15)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--accent)" }}
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Top 10 Slots Today</h2>
        </div>

        <Link
          id="view-all-slots-btn"
          href="/top-slots"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: "var(--accent)",
            color: "white",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
          }}
        >
          View All
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      {/* Slots grid */}
      {isLoadingSlots ? (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl animate-pulse"
              style={{ background: "var(--bg-card)", aspectRatio: "3/4" }}
            />
          ))}
        </div>
      ) : (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
        >
          {displaySlots.map((game, index) => (
            <GameCard key={game.id} game={game} rank={index + 1} />
          ))}
        </div>
      )}
    </section>
  );
}
