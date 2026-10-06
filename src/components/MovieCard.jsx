import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card-link"
    >
      <div className="movie-card">  
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Poster'
          }
          alt={movie.title}
          className="movie-poster"
        />

        <h3>{movie.title}</h3>

        <p>⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10</p>
      </div>
    </Link>
  )
}

export default MovieCard