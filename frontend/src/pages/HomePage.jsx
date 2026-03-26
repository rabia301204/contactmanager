import { useEffect, useState, useMemo } from "react";
import { useContacts } from "../context/contactcontext";
import SearchBar from "../components/SearchBar";
import ContactList from "../components/ContactList";

const CATEGORY_COLORS = {
  friend: "#90cdf4",
  family: "#9ae6b4",
  work: "#b794f4",
  other: "#a0aec0",
};

function HomePage() {
  const { contacts, loading, error, loadContacts } = useContacts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [tab, setTab] = useState("all"); // all | favorites

  useEffect(() => {
    const timer = setTimeout(() => {
      loadContacts({ search, category });
    }, 400);
    return () => clearTimeout(timer);
  }, [search, category, loadContacts]);

  // Client-side sort + favorites filter
  const displayed = useMemo(() => {
    let list = tab === "favorites" ? contacts.filter((c) => c.isFavorite) : contacts;
    switch (sort) {
      case "az": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "za": return [...list].sort((a, b) => b.name.localeCompare(a.name));
      case "oldest": return [...list].reverse();
      case "favorites": return [...list].sort((a, b) => b.isFavorite - a.isFavorite);
      default: return list;
    }
  }, [contacts, sort, tab]);

  // Stats
  const stats = useMemo(() => {
    const total = contacts.length;
    const favorites = contacts.filter((c) => c.isFavorite).length;
    const byCategory = ["friend", "family", "work", "other"].map((cat) => ({
      cat,
      count: contacts.filter((c) => c.category === cat).length,
    })).filter((x) => x.count > 0);
    return { total, favorites, byCategory };
  }, [contacts]);

  return (
    <div className="page-wrapper">
      {/* Stats Bar */}
      {!loading && contacts.length > 0 && (
        <div className="stats-bar">
          <div className="stat-chip">
            <span className="dot" style={{ background: "#63b3ed" }} />
            <strong>{stats.total}</strong> total
          </div>
          <div className="stat-chip">
            <span>★</span>
            <strong>{stats.favorites}</strong> favorites
          </div>
          {stats.byCategory.map(({ cat, count }) => (
            <div className="stat-chip" key={cat}>
              <span className="dot" style={{ background: CATEGORY_COLORS[cat] }} />
              <strong>{count}</strong> {cat}
            </div>
          ))}
        </div>
      )}

      <SearchBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        sort={sort} setSort={setSort}
      />

      {/* Tabs */}
      <div className="filter-tabs">
        <button className={`tab${tab === "all" ? " active" : ""}`} onClick={() => setTab("all")}>
          All Contacts
        </button>
        <button className={`tab${tab === "favorites" ? " active" : ""}`} onClick={() => setTab("favorites")}>
          ★ Favorites {stats.favorites > 0 && `(${stats.favorites})`}
        </button>
      </div>

      <p className="results-count">
        {displayed.length} contact{displayed.length !== 1 ? "s" : ""}
        {tab === "favorites" ? " in favorites" : " found"}
      </p>

      <ContactList contacts={displayed} loading={loading} error={error} />
    </div>
  );
}

export default HomePage;