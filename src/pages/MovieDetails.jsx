import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MovieDetails.css'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.status_message || 'Movie not found')
        }

        setMovie(data)

        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        )

        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json()
          setCast(creditsData.cast || [])
        } else {
          setCast([])
        }
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) {
    return <main className="movie-details-page">Loading movie details...</main>
  }

  if (error || !movie) {
    return (
      <main className="movie-details-page">
        <p>{error || 'Movie not found'}</p>
        <Link to="/popular">← Back to Movies</Link>
      </main>
    )
  }

  return (
    <main className="movie-details-page">
      <Link to="/popular">← Back to Movies</Link>

      <div className="movie-details-content">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Poster'
          }
          alt={movie.title}
        />

        <div>
          <h1>{movie.title}</h1>
          <p>⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10</p>
          <p>Release date: {movie.release_date || 'Not available'}</p>
          <p>{movie.overview || 'No description available.'}</p>
        </div>
      </div>

      <section className="cast-section">
        <h2>Cast</h2>

        {cast.length === 0 ? (
          <p>Cast information is not available.</p>
        ) : (
          <div className="cast-grid">
            {cast.slice(0, 8).map((actor) => (
              <div className="cast-card" key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : 'https://placehold.co/200x280?text=No+Photo'
                  }
                  alt={actor.name}
                />
                <h3>{actor.name}</h3>
                <p>{actor.character || 'Character not listed'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default MovieDetails