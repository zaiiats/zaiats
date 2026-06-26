import { useEffect, useState } from "react";

export function useScrollObserver() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("mainContainer");
    if (!container) return;

    const onScroll = () => {
      setIsScrolled(container.scrollTop > 0);
    };

    onScroll();

    container.addEventListener("scroll", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { isVisible: !isScrolled };
}
