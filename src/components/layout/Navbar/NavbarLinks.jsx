import { Link } from "react-router-dom";
import { CategorySelect, OrderStatusSelect } from "./NavbarSelects";
import { useNavbarFilters } from "./useNavbarFilters";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => {
  const {
    categories,
    selectedCategory,
    selectedOrderStatus,
    handleCategoryChange,
    handleOrderStatusChange,
  } = useNavbarFilters();

  return (
    <div className="hidden md:flex items-center gap-6">
      <Link to="/books" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        Browse
      </Link>
      <CategorySelect
        categories={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
        triggerClassName="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none cursor-pointer transition hover:border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
      />
      {isAuthenticated && (
        <>
          <OrderStatusSelect
            value={selectedOrderStatus}
            onChange={handleOrderStatusChange}
            label="Orders"
            labelClassName="text-slate-600"
            triggerClassName="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none cursor-pointer transition hover:border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
          {isManager && (
            <Link to="/manager" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
              Inventory
            </Link>
          )}
          {isAdmin && (
            <>
              <Link to="/admin/reviews" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
                Reviews
              </Link>
              <Link to="/admin/users" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
                Controls
              </Link>
            </>
          )}
        </>
      )}
      <Link to="/about" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        About
      </Link>
      <Link to="/help" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        Help
      </Link>
    </div>
  );
};
