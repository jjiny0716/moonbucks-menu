import Router from './Router.mjs';

export const router = new Router(location.pathname, {
  "/": "Espresso",
  "/espresso": "Espresso",
  "/frappuccino": "Frappuccino",
  "/blended": "Blended",
  "/teavana": "Teavana",
  "/desert": "Desert",
});