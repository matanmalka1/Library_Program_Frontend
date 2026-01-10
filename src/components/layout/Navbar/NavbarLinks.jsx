import { NavLink } from "react-router-dom";
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

  const getLinkClassName = ({ isActive }) =>
    `font-medium no-underline transition-colors ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <div className="hidden md:flex items-center gap-6">
      <NavLink to="/books" className={getLinkClassName}>
        Browse
      </NavLink>
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
            <NavLink to="/manager" className={getLinkClassName}>
              Inventory
            </NavLink>
          )}
          {isAdmin && (
            <>
              <NavLink to="/admin/reviews" className={getLinkClassName}>
                Reviews
              </NavLink>
              <NavLink to="/admin/users" className={getLinkClassName}>
                Controls
              </NavLink>
            </>
          )}
        </>
      )}
      <NavLink to="/about" className={getLinkClassName}>
        About
      </NavLink>
      <NavLink to="/help" className={getLinkClassName}>
        Help
      </NavLink>
    </div>
  );
};
