import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Search } from "lucide-react";
import { useAuth } from "../../../context/auth/AuthContext";
import { useCart } from "../../../context/cart/CartContext";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarActions";
import { NavbarMobileMenu } from "./NavbarMobileMenu";

export const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isManager } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("search") || "";
    setSearchQuery(value);
  }, [location.search]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchQuery.trim();
    const params = new URLSearchParams();
    if (location.pathname === "/books") {
      const current = new URLSearchParams(location.search);
      const category = current.get("category");
      if (category) params.set("category", category);
    }
    if (term) params.set("search", term);
    const query = params.toString();
    navigate({ pathname: "/books", search: query ? `?${query}` : "" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-slate-800 font-serif tracking-[-0.01em]">
              Books
            </span>
          </Link>

          <NavbarLinks
            isAuthenticated={isAuthenticated}
            isManager={isManager}
            isAdmin={isAdmin}
          />

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative"
          >
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-32 lg:w-44 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full outline-none transition focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              placeholder="Search books"
              aria-label="Search books"
            />
          </form>

          <NavbarActions
            isAuthenticated={isAuthenticated}
            user={user}
            totalItems={totalItems}
            onLogout={handleLogout}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden border-0 bg-transparent text-slate-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <NavbarMobileMenu
          isAuthenticated={isAuthenticated}
          isManager={isManager}
          isAdmin={isAdmin}
          totalItems={totalItems}
          onLogout={handleLogout}
          onNavigate={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};
