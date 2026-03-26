function SearchBar({ search, setSearch, category, setCategory, sort, setSort }) {
  return (
    <div className="controls">
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="friend">Friend</option>
        <option value="family">Family</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">Name A → Z</option>
        <option value="za">Name Z → A</option>
        <option value="favorites">Favorites First</option>
      </select>
    </div>
  );
}

export default SearchBar;