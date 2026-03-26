"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Game } from "../context/CasinoContext";

interface GameCardProps {
  game: Game;
  rank?: number; // for top slots
}

export default function GameCard({ game, rank }: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgV2Error, setImgV2Error] = useState(false);

  const imageUrl =
    !imgV2Error && game.imageUrlV2
      ? game.imageUrlV2
      : !imgError
      ? game.imageUrl
      : null;

  return (
    <div
      id={`game-card-${game.id}`}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        aspectRatio: "3/4",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 24px rgba(230,57,70,0.2)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Rank badge */}
      {rank && (
        <div
          className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {rank}
        </div>
      )}

      {/* Game image */}
      {imageUrl ? (
        <div className="absolute inset-0">
          {!imgV2Error && game.imageUrlV2 ? (
            <Image
              src={game.imageUrlV2}
              alt={game.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover"
              onError={() => setImgV2Error(true)}
              unoptimized
            />
          ) : !imgError ? (
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <PlaceholderImage name={game.name} />
          )}
        </div>
      ) : (
        <PlaceholderImage name={game.name} />
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
        }}
      >
        <p
          className="font-semibold text-sm leading-tight text-white truncate"
        >
          {game.name}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>
          {game.providerName}
        </p>
      </div>

      {/* Always visible name at bottom for mobile */}
      <div
        className="absolute bottom-0 left-0 right-0 px-2 py-1.5 group-hover:opacity-0 transition-opacity duration-200"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        }}
      >
        <p className="text-xs font-medium text-white truncate leading-tight">
          {game.name}
        </p>
      </div>
    </div>
  );
}

function PlaceholderImage({ name }: { name: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"
      style={{ background: "var(--bg-card)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "var(--bg-secondary)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "var(--text-muted)" }}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>
      <p
        className="text-center text-xs font-medium leading-tight text-white"
        style={{ color: "var(--text-secondary)" }}
      >
        SUPABETS®
      </p>
      <p
        className="text-center text-xs leading-tight"
        style={{ color: "var(--text-muted)", fontSize: "10px" }}
      >
        {name}
      </p>
    </div>
  );
}
