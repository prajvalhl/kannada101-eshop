import React from "react";
import { useCart } from "../cart-context";
import { useWishList } from "../wishlist-context";
import { Link } from "react-router-dom";

export let filteredWishList;

export function Header() {
  const { state } = useCart();
  const { wishListData } = useWishList();
  filteredWishList = wishListData.filter((product) => product.inWishList);

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
        <Link to="/wishlist" className="btn-show-icon">
          <span className="material-icons"> favorite_border </span>
          {filteredWishList.length > 0 && (
            <span className="icon-badge">{filteredWishList.length}</span>
          )}
        </Link>
        <Link to="/cart" className="btn-show-icon">
          <span className="material-icons"> shopping_cart </span>
          {state.length > 0 && (
            <span className="icon-badge">{totalCartItems}</span>
          )}
        </Link>
      </div>
    </div>
  );
}
