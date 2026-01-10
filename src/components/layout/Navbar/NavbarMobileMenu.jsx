import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { CategorySelect, OrderStatusSelect } from "./NavbarSelects";
import { useNavbarFilters } from "./useNavbarFilters";

export const NavbarMobileMenu = ({
  isAuthenticated,
  isManager,
  isAdmin,
  totalItems,
  onLogout,
  onNavigate,
}) => {
  const {
    categories,
    selectedCategory,
    selectedOrderStatus,
    handleCategoryChange,
    handleOrderStatusChange,
  } = useNavbarFilters(onNavigate);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const getLinkClassName = ({ isActive }) =>
    `no-underline text-lg font-medium transition-colors ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-slate-700 hover:text-indigo-600"
    }`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("search") || "";
    setSearchQuery(value);
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchQuery.trim();
    const params = new URLSearchParams();
    const current = new URLSearchParams(location.search);
    const category = current.get("category");
    if (category) params.set("category", category);
    if (term) params.set("search", term);
    const query = params.toString();
    navigate({ pathname: "/books", search: query ? `?${query}` : "" });
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6 bg-white border-b border-slate-200 animate-[navbar-slide-in_0.25s_ease]">
      <NavLink
        to="/books"
        className={getLinkClassName}
        onClick={onNavigate}
      >
        Browse Catalog
      </NavLink>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          placeholder="Search books"
          aria-label="Search books"
        />
      </form>
      <CategorySelect
        categories={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Browse by Category"
        triggerClassName="inline-flex items-center justify-between gap-2 text-slate-700 text-lg font-medium bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
      />
      {isAuthenticated ? (
        <>
          <OrderStatusSelect
            value={selectedOrderStatus}
            onChange={handleOrderStatusChange}
            label="Orders"
            triggerClassName="inline-flex items-center justify-between gap-2 text-slate-700 text-lg font-medium bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
          {isManager && (
            <NavLink
              to="/manager"
              className={getLinkClassName}
              onClick={onNavigate}
            >
              Inventory Management
            </NavLink>
          )}
          {isAdmin && (
            <>
              <NavLink
                to="/admin/reviews"
                className={getLinkClassName}
                onClick={onNavigate}
              >
                Pending
              </NavLink>
              <NavLink
                to="/admin/users"
                className={getLinkClassName}
                onClick={onNavigate}
              >
                User Controls
              </NavLink>
            </>
          )}
          <NavLink
            to="/wishlist"
            className={getLinkClassName}
            onClick={onNavigate}
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `no-underline text-lg font-medium flex items-center justify-between transition-colors ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-700 hover:text-indigo-600"
              }`
            }
            onClick={onNavigate}
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="min-w-[24px] h-6 px-2 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className="no-underline bg-indigo-600 text-white text-center py-3 px-4 rounded-[14px] font-semibold"
          onClick={onNavigate}
        >
          Sign In
        </NavLink>
      )}
      <NavLink
        to="/about"
        className={getLinkClassName}
        onClick={onNavigate}
      >
        About
      </NavLink>
      <NavLink
        to="/help"
        className={getLinkClassName}
        onClick={onNavigate}
      >
        Help
      </NavLink>
      {isAuthenticated && (
        <button
          onClick={onLogout}
          className="border-0 bg-transparent text-red-600 text-lg font-semibold text-left cursor-pointer p-0"
          type="button"
        >
          Logout
        </button>
      )}
    </div>
  );
};
