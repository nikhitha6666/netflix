import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <main className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">YOUR MOVIE DESTINATION</p>

          <h1>
            Discover Movies.
            <br />
            Experience Stories.
          </h1>

          <p className="hero-description">
            Explore popular movies, discover top-rated classics,
            and find your next favorite film.
          </p>

          <button
            className="explore-button"
            onClick={() => navigate('/popular')}
          >
            Explore Movies →
          </button>
        </div>
      </section>

      <section className="home-info">
        <h2>Welcome to Movie Explorer</h2>
        <p>
          Browse movies, explore ratings, and discover amazing stories
          from around the world.
        </p>
      </section>
    </main>
  )
}

export default Home