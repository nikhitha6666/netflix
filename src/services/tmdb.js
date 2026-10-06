const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  const data = await response.json()
  return data.results
}