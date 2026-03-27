import { useState, useEffect, useRef } from 'react';
import { API_KEY, BASE_URL, MAX_PAGES } from './constants';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';

function App() {
  const [movies, setMovies]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [currentPage, setCurrentPage]     = useState(1);
  const [totalPages, setTotalPages]       = useState(1);
  const [searchQuery, setSearchQuery]     = useState('');
  const [sortBy, setSortBy]               = useState('default');

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
      <Header
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <main className="main-content">
        <MovieGrid movies={movies} loading={loading} />
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}

export default App;
