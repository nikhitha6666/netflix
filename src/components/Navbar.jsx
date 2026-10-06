import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const query = searchTerm.trim()

    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
      setSearchTerm('')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Movie Explorer
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/popular">Popular</NavLink>
        <NavLink to="/top-rated">Top Rated</NavLink>
        <NavLink to="/upcoming">Upcoming</NavLink>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar