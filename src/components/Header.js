import React from "react";
import { useCart } from "../cart-context";
import { useNav } from "../navigation-context";

export function Header() {
  const { state } = useCart();
  const { setRoute } = useNav();

  return (
    <div>
      <h1 onClick={() => setRoute("product")}>Kannada101</h1>
      <button onClick={() => setRoute("cart")} className="btn-show-cart">
        <span class="material-icons"> shopping_cart </span>
        <span class="icon-badge">{state.length}</span>
      </button>
    </div>
  );
}
