import { useState, useEffect, useRef } from 'react';

const API_KEY  = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w342';
const MAX_PAGES = 500;

function MovieCard({ movie }) {
  const rating  = movie.vote_average != null ? movie.vote_average.toFixed(3) : 'N/A';
  const dateStr = movie.release_date || 'Unknown';

  return (
    <article className="movie-card" role="listitem">
      <div className="movie-poster-wrap">
        {movie.poster_path ? (
          <img
            className="movie-poster"
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title || 'Untitled'}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title || 'Untitled'}</h2>
        <p className="movie-date">Release Date: {dateStr}</p>
        <p className="movie-rating">Rating: {rating}</p>
      </div>
    </article>
  );
}

function App() {
  const [movies, setMovies]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy]           = useState('default');

  const debounceRef = useRef(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setMovies([]);

      const endpoint = searchQuery
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;

      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let results = data.results || [];

        if (sortBy === 'release_date') {
          results = [...results].sort((a, b) =>
            (b.release_date || '') > (a.release_date || '') ? 1 : -1
          );
        } else if (sortBy === 'vote_average') {
          results = [...results].sort((a, b) =>
            (b.vote_average || 0) - (a.vote_average || 0)
          );
        }

        setMovies(results);
        setTotalPages(Math.min(data.total_pages || 1, MAX_PAGES));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [currentPage, searchQuery, sortBy]);

  function handleSearchChange(e) {
    const value = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value.trim());
      setCurrentPage(1);
    }, 400);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }

  function handlePrev() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(p => p - 1);
  }

  function handleNext() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(p => p + 1);
  }

  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Movie Explorer</h1>
        <div className="controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie..."
            autoComplete="off"
            aria-label="Search movies"
            onChange={handleSearchChange}
          />
          <select
            className="sort-select"
            aria-label="Sort movies by"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Average Rating</option>
          </select>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading-state" aria-live="polite">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="movie-grid" role="list">
            {movies.length === 0 ? (
              <div className="empty-state">
                <p>No films found.</p>
              </div>
            ) : (
              movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
            )}
          </div>
        )}
      </main>

      <footer className="pagination">
        <button
          className="page-btn"
          disabled={currentPage <= 1}
          aria-label="Previous page"
          onClick={handlePrev}
        >
          Previous
        </button>
        <span className="page-number">Page {currentPage}</span>
        <button
          className="page-btn"
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          onClick={handleNext}
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default App;
