import { EVENTS } from "./consts";

export function navigate(href) {
  window.history.pushState({}, "", href);
  //crear evento personalizado para avisar que moveremos a otra url
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0; //primary click
    const isModifiedEvent =
      event.metakeey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault(); //evita que se refresque la página al hacer click en el enlace
      navigate(to); //navegacion con SPA (Single Page Application)
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
