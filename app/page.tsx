import { CasinoProvider } from "./context/CasinoContext";
import SearchBar from "./components/SearchBar";
import CategoryTabs from "./components/CategoryTabs";
import GamesGrid from "./components/GamesGrid";
import TopSlotsSection from "./components/TopSlotsSection";

export default function Home() {
  return (
    <CasinoProvider>
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
        <SearchBar />
        <CategoryTabs />
        <main className="flex-1 flex flex-col">
          <GamesGrid />
          <TopSlotsSection />
        </main>
      </div>
    </CasinoProvider>
  );
}
