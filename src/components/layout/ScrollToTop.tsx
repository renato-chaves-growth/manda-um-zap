import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Rola para o topo instantaneamente a cada mudança de rota. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
