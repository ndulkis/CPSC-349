import { IMG_BASE } from '../constants';

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

export default MovieCard;
