import { create } from "zustand";

export const usePathStore = create((set) => {
  return {
    currentPath: window.location.pathname,

    setCurrentPath: (path) => {
      // console.log("setCurrentPath");
      set({
        currentPath: path,
      });
    },
  };
});
