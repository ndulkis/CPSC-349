function Header({ sortBy, onSearchChange, onSortChange }) {
  return (
    <header className="site-header">
      <h1 className="site-title">Movie Explorer</h1>
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          autoComplete="off"
          aria-label="Search movies"
          onChange={onSearchChange}
        />
        <select
          className="sort-select"
          aria-label="Sort movies by"
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="default">Sort By</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Average Rating</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
