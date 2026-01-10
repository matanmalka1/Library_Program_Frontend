import { Link } from "react-router-dom";
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

  return (
    <div className="flex flex-col gap-4 px-4 py-6 bg-white border-b border-slate-200 animate-[navbar-slide-in_0.25s_ease]">
      <Link
        to="/books"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        Browse Catalog
      </Link>
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
            <Link
              to="/manager"
              className="text-slate-700 no-underline text-lg font-medium"
              onClick={onNavigate}
            >
              Inventory Management
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin/reviews"
                className="text-slate-700 no-underline text-lg font-medium"
                onClick={onNavigate}
              >
                Pending
              </Link>
              <Link
                to="/admin/users"
                className="text-slate-700 no-underline text-lg font-medium"
                onClick={onNavigate}
              >
                User Controls
              </Link>
            </>
          )}
          <Link
            to="/wishlist"
            className="text-slate-700 no-underline text-lg font-medium"
            onClick={onNavigate}
          >
            Wishlist
          </Link>
          <Link
            to="/cart"
            className="text-slate-700 no-underline text-lg font-medium flex items-center justify-between"
            onClick={onNavigate}
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="min-w-[24px] h-6 px-2 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </>
      ) : (
        <Link
          to="/login"
          className="no-underline bg-indigo-600 text-white text-center py-3 px-4 rounded-[14px] font-semibold"
          onClick={onNavigate}
        >
          Sign In
        </Link>
      )}
      <Link
        to="/about"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        About
      </Link>
      <Link
        to="/help"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        Help
      </Link>
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
