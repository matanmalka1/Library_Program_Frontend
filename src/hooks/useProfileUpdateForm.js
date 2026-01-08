import { useEffect, useRef, useState } from "react";
import { authService } from "../services/AuthService";
import { useAuth } from "../context/auth/AuthContext";

export const useProfileUpdateForm = ({
  submitPayload,
  successMessage,
  onSuccess,
  reset,
}) => {
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const updatedUser = await authService.updateProfile(submitPayload(data));
      updateUser(updatedUser);
      if (onSuccess) {
        onSuccess(successMessage);
      }
      reset(data);
      setSaved(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setSaved(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    saved,
    handleSubmit,
  };
};
