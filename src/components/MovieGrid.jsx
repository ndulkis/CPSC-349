import MovieCard from './MovieCard';

function MovieGrid({ movies, loading }) {
  if (loading) {
    return (
      <div className="loading-state" aria-live="polite">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="movie-grid" role="list">
      {movies.length === 0 ? (
        <div className="empty-state">
          <p>No films found.</p>
        </div>
      ) : (
        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
}

export default MovieGrid;
