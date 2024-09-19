import { useEffect, useState } from "react";
import { EVENTS } from "./consts.js";
import { usePathStore } from "./store/routeStore.js";
import { match } from "path-to-regexp";

export function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => (
    <h1>Componente de ruta no encontrado</h1>
  ),
}) {
  const { currentPath, setCurrentPath } = usePathStore((state) => state);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);
  let routeParams = {};
  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true;
    //path-to-regex para generar rutas dinamicas ('/search/:params)
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) {
      return false;
    }

    routeParams = matched.params;
    return true;
  })?.Component; //optional chaining

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent />;
}
