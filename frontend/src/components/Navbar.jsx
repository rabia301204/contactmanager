import { Link } from "react-router-dom";
import { useTheme } from "../context/themecontext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-dot" />
          Contacts
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Theme toggle */}
          <button
            className="btn-theme"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link to="/add" className="btn-add">
            <span>＋</span> New Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;