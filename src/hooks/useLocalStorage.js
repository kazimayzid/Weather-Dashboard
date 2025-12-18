import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error("LocalStorage error:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
