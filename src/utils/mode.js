// Which "front door" the visitor last used. Detail pages (project/certificate)
// use it so their back button returns to the right home: the website at "/"
// or the terminal at "/terminal".
const KEY = "portfolio-mode";

export const setMode = (mode) => {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* storage unavailable (private mode) — fall back to website */
  }
};

export const getHomePath = () => {
  try {
    return localStorage.getItem(KEY) === "terminal" ? "/terminal" : "/";
  } catch {
    return "/";
  }
};

export const getMode = () => {
  try {
    return localStorage.getItem(KEY) === "terminal" ? "terminal" : "website";
  } catch {
    return "website";
  }
};
