import { useCallback, useEffect, useState } from "react";

const SCREENS = new Set(["home", "test", "context", "result", "method"]);

function getScreenFromHash() {
  const value = window.location.hash.replace("#", "");
  return SCREENS.has(value) ? value : "home";
}

export function useScreenNavigation() {
  const [screen, setScreen] = useState(getScreenFromHash);

  useEffect(() => {
    const onHashChange = () => setScreen(getScreenFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next) => {
    if (window.location.hash === `#${next}`) setScreen(next);
    else window.location.hash = next;
  }, []);

  return [screen, navigate];
}
