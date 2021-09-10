import React from "react";
import { useCart } from "../cart-context";
import { useNav } from "../navigation-context";

export function Header() {
  const { state } = useCart();
  const { setRoute } = useNav();

  return (
    <div>
      <button onClick={() => setRoute("product")}>
        <h1>Kannada101</h1>
      </button>
      <button onClick={() => setRoute("cart")}>Cart: {state.length}</button>
    </div>
  );
}
