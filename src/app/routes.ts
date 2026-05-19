import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import RootLayout from "./layouts/root-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "routine", Component: Home },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
    ],
  },
], {
  basename: "/price2",
});