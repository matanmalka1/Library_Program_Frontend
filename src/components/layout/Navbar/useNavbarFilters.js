import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryService } from "../../../services/CategoryService";
import { OrderStatus } from "../../../types";

export const useNavbarFilters = (onNavigate) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const notifyNavigate = typeof onNavigate === "function" ? onNavigate : null;

  useEffect(() => {
    let isActive = true;
    categoryService
      .getCategories()
      .then((data) => {
        if (isActive) setCategories(data);
      })
      .catch(() => {
        if (isActive) setCategories([]);
      });
    return () => {
      isActive = false;
    };
  }, []);

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
