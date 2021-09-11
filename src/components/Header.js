import React from "react";
import { useCart } from "../cart-context";
import { useNav } from "../navigation-context";

export function Header() {
  const { state } = useCart();
  const { setRoute } = useNav();

  return (
    <div className="header">
      <h1 className="brand-title" onClick={() => setRoute("product")}>
        Kannada101
      </h1>
      <div>
        <button onClick={() => setRoute("cart")} className="btn-show-cart">
          <span className="material-icons"> shopping_cart </span>
          {state.length > 0 && (
            <span className="icon-badge">{state.length}</span>
          )}
        </button>
      </div>
    </div>
  );
}
