import { Link } from "react-router"
export default function Navbar() {
  return (
    <div >
      <nav >
        <div class="navbarContainer p-3">
          <div className="navbarIcon">
              <Link className="nav-links" to="/">StayFinder</Link>
          </div>
          <div class="navbarItems" id="navbarItems">
              <Link class="nav-links" to="/">Blog</Link>
              <Link class="nav-links" to="/hotels">Hotels</Link>
              <Link class="nav-links" to="/favourite">Favourite</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}