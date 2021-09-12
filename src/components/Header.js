import React from "react";
import { useCart } from "../cart-context";
import { useNav } from "../navigation-context";

export function Header() {
  const { state } = useCart();
  const { setRoute } = useNav();

  const totalCartItems = state.reduce((acc, value) => {
    return (acc += value.quantity);
  }, 0);

  return (
    <div className="header">
      <p className="brand-title" onClick={() => setRoute("product")}>
        KannadaClass101
      </p>
      <div>
        <button onClick={() => setRoute("cart")} className="btn-show-cart">
          <span className="material-icons"> shopping_cart </span>
          {state.length > 0 && (
            <span className="icon-badge">{totalCartItems}</span>
          )}
        </button>
      </div>
    </div>
  );
}
