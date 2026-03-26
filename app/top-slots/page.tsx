"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GameCard from "../components/GameCard";
import { Game } from "../context/CasinoContext";

export default function TopSlotsPage() {
  const [slots, setSlots] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://supaskins-backend.azurewebsites.net/api/v1/home/top-items/slots")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setSlots(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-4 py-4 flex items-center gap-4"
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          id="back-to-home-btn"
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
          aria-label="Back to casino"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        <div className="flex items-center gap-3">
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
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Top Slots</h1>
            {!isLoading && (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {slots.length} games available
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {isLoading ? (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
          >
            {Array.from({ length: 17 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl animate-pulse"
                style={{ background: "var(--bg-card)", aspectRatio: "3/4" }}
              />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              All top slot games, ranked by popularity
            </p>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
            >
              {slots.map((game, index) => (
                <GameCard key={game.id} game={game} rank={index + 1} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
