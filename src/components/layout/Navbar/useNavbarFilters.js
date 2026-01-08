import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderStatus } from "../../../types";
import { useCategoryFilter } from "../../../hooks/useCategoryFilter";

export const useNavbarFilters = (onNavigate) => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryFilter({ allValue: "all" });
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const notifyNavigate = typeof onNavigate === "function" ? onNavigate : null;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (!status) {
      setSelectedOrderStatus("");
      return;
    }
    const allowed = new Set(Object.values(OrderStatus));
    setSelectedOrderStatus(allowed.has(status) ? status : "");
  }, [location.search]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (!value || value === "all") {
      navigate("/books");
    } else {
      navigate(`/books?category=${encodeURIComponent(value)}`);
    }
    if (notifyNavigate) notifyNavigate();
  };

  const handleOrderStatusChange = (value) => {
    setSelectedOrderStatus(value);
    navigate(`/orders?status=${encodeURIComponent(value)}`);
    if (notifyNavigate) notifyNavigate();
  };

  return {
    categories,
    selectedCategory,
    selectedOrderStatus,
    handleCategoryChange,
    handleOrderStatusChange,
  };
};
