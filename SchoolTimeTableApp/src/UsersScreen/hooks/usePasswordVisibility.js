import { useState } from "react";

export const usePasswordVisibility = () => {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return {
    visiblePasswords,
    togglePasswordVisibility,
  };
};
