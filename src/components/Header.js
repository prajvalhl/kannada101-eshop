import React from "react";
import { useCart } from "../cart-context";
import { Link } from "react-router-dom";

export function Header() {
  const { state } = useCart();

  const totalCartItems = state.reduce((acc, value) => {
    return (acc += value.quantity);
  }, 0);

  return (
    <div className="header">
      <p>
        <Link
          className="brand-title"
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          KannadaClass101
        </Link>
      </p>
      <div>
        <Link to="/cart" className="btn-show-cart">
          <span className="material-icons"> shopping_cart </span>
          {state.length > 0 && (
            <span className="icon-badge">{totalCartItems}</span>
          )}
        </Link>
      </div>
    </div>
  );
}
