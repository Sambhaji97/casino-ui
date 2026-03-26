"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Game {
  id: number;
  name: string;
  imageUrl: string;
  imageUrlV2: string | null;
  providerName: string;
  providerId: number;
  isFavourite: boolean;
  tryGame: boolean;
  gameType: string;
  description: string;
}

export interface Category {
  id: number;
  slug: string; // icon SVG URL
  name: string;
  layout: null;
  categoryType: number;
  games: Game[];
}

interface CasinoContextType {
  categories: Category[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  topSlots: Game[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoading: boolean;
  isLoadingSlots: boolean;
  filteredGames: Game[];
}

const CasinoContext = createContext<CasinoContextType | null>(null);

export function CasinoProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [topSlots, setTopSlots] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setCategories(data.data);
          // Default: select first category
          if (data.data.length > 0) {
            setSelectedCategoryId(data.data[0].id);
          }
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/top-slots")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setTopSlots(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoadingSlots(false));
  }, []);

  const filteredGames = React.useMemo(() => {
    const selectedCat = categories.find((c) => c.id === selectedCategoryId);
    const games = selectedCat?.games ?? [];
    if (!searchQuery.trim()) return games;
    const q = searchQuery.toLowerCase();
    return games.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.providerName.toLowerCase().includes(q)
    );
  }, [categories, selectedCategoryId, searchQuery]);

  return (
    <CasinoContext.Provider
      value={{
        categories,
        selectedCategoryId,
        setSelectedCategoryId,
        topSlots,
        searchQuery,
        setSearchQuery,
        isLoading,
        isLoadingSlots,
        filteredGames,
      }}
    >
      {children}
    </CasinoContext.Provider>
  );
}

export function useCasino() {
  const ctx = useContext(CasinoContext);
  if (!ctx) throw new Error("useCasino must be used within CasinoProvider");
  return ctx;
}
