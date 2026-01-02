import { useEffect } from "react";

export const useDrawerScrollLock = (drawerId: string = "mobile-drawer") => {
  useEffect(() => {
    const drawer = document.getElementById(drawerId) as HTMLInputElement;
    const toggleScroll = () => {
      if (drawer?.checked) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    drawer?.addEventListener("change", toggleScroll);
    return () => drawer?.removeEventListener("change", toggleScroll);
  }, [drawerId]);
};
