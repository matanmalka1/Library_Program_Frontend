import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { categoryService } from "../services/CategoryService";

export const useCategoryFilter = ({ allValue = "all" } = {}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(allValue);
  const location = useLocation();

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
    const selected = params.get("category");
    if (!selected) {
      setSelectedCategory(allValue);
      return;
    }
    if (selected.toLowerCase() === allValue.toLowerCase()) {
      setSelectedCategory(allValue);
      return;
    }
    setSelectedCategory(selected);
  }, [location.search, allValue]);

  return { categories, selectedCategory, setSelectedCategory };
};
