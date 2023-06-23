export const getLS = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return defaultValue;
};

export const setLS = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const KEYS = {
  USER_INFO: "USER_INFO",
};
