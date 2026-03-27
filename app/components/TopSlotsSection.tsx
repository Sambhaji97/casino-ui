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

        <div className="flex items-center gap-4">
          <Link
            id="view-all-slots-btn"
            href="/top-slots"
            className="text-sm font-semibold text-white transition-colors px-3 py-1.5 rounded"
            style={{
              textDecoration: "none",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            View All
          </Link>
          <div className="flex items-center gap-[2px]">
            <button
              className="flex items-center justify-center w-7 h-7 rounded shrink-0 transition-colors"
              style={{ background: "#33353b", color: "#a5a7aa" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#33353b";
                (e.currentTarget as HTMLButtonElement).style.color = "#a5a7aa";
              }}
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M16 6 L8 12 L16 18 Z" fill="currentColor" />
              </svg>
            </button>
            <button
              className="flex items-center justify-center w-7 h-7 rounded shrink-0 transition-colors"
              style={{ background: "#33353b", color: "#a5a7aa" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#33353b";
                (e.currentTarget as HTMLButtonElement).style.color = "#a5a7aa";
              }}
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M8 6 L16 12 L8 18 Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
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
            <div key={game.id} className="relative">
              <GameCard game={game} priority={index < 3} />
              
              <span 
                className="absolute pointer-events-none font-black"
                style={{ 
                  bottom: "-6px",
                  left: "-4px",
                  zIndex: 30,
                  fontSize: "64px",
                  lineHeight: "1",
                  color: "black", 
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.8)",
                  textShadow: "2px 4px 6px rgba(0,0,0,0.5)"
                }}
              >
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
