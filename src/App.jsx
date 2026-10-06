import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import './App.css'



const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieListPage({ title, endpoint }) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.status_message || 'Could not load movies.')
        }

        setMovies(data.results || [])
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint, page])

  return (
    <main className="home-page">
      <h1>{title}</h1>
      <p>Discover your next favorite movie.</p>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <span>Page {page}</span>

            <button
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  )
}

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function searchMovies() {
      if (!query.trim()) {
        setMovies([])
        setLoading(false)
        setError('')
        return
      }

      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.status_message || 'Search failed.')
        }

        setMovies(data.results || [])
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [query])

  return (
    <main className="home-page">
      <h1>Search Results</h1>
      <p>Movies matching "{query}"</p>

      {loading && <p>Searching movies...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found. Try another title.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/popular"
          element={
            <MovieListPage
              title="Popular Movies"
              endpoint="/movie/popular"
            />
          }
        />

        <Route
          path="/top-rated"
          element={
            <MovieListPage
              title="Top Rated Movies"
              endpoint="/movie/top_rated"
            />
          }
        />

        <Route
          path="/upcoming"
          element={
            <MovieListPage
              title="Upcoming Movies"
              endpoint="/movie/upcoming"
            />
          }
        />

        <Route path="/search" element={<SearchResultsPage />} />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App