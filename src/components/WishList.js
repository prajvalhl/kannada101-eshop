import React from "react";
import { useCart } from "../cart-context";
import { useWishList } from "../wishlist-context";
import { giveRatingsBgColor } from "../cart-context";
import { Link } from "react-router-dom";

function WishListEmpty() {
  return (
    <div className="cart-empty-banner">
      <p className="fs fs-1">Your WishList is empty.</p>
      <p className="fs fs-4">
        Check your Cart or{" "}
        <Link to="/" className="cart-empty-continue-shopping">
          continue shopping
        </Link>
        .
      </p>
    </div>
  );
}

export function WishList() {
  const { cartDispatch } = useCart();
  const { wishListData, wishListDispatch } = useWishList();

  const filteredWishList = wishListData.filter((product) => product.inWishList);

  return (
    <div className="all-productListing-items">
      {filteredWishList.length === 0 ? (
        <WishListEmpty />
      ) : (
        filteredWishList.map((prod) => (
          <div className="card-vertical" key={prod.id}>
            <Link
              to={`/product/${prod.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                className={`card-vertical-thumbnail ${
                  !prod.inStock ? "out-of-stock-image" : undefined
                }`}
                src={prod.image}
                alt={prod.name}
              />
            </Link>
            <p
              style={{ display: !prod.inStock ? "block" : "none" }}
              className="out-of-stock-text"
            >
              OUT <br /> OF <br /> STOCK
            </p>
            <div>
              <p className="ptext p-head">
                <Link
                  to={`/product/${prod.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {prod.name}
                </Link>
              </p>
              <div
                className="rating vertical-rating"
                style={{ backgroundColor: giveRatingsBgColor(prod.ratings) }}
              >
                <p>{prod.ratings}</p>
                <span className="material-icons"> star_rate </span>
              </div>
              <p className="ptext p-dec">
                {prod.fastDelivery ? "✔ Fast Delivery" : "7-Day Delivery"}
              </p>
              <p className="ptext p-price">₹{prod.price}</p>
              <button
                className="btn btn-primary btn-icon add-to-wishlist"
                onClick={() =>
                  wishListDispatch({ type: "ADD_TO_WISHLIST", product: prod })
                }
              >
                <span className="material-icons"> favorite </span>
              </button>
              <button
                className={`btn btn-primary btn-icon add-to-cart ${
                  !prod.inStock && "add-to-cart-out-of-stock"
                }`}
                onClick={() =>
                  cartDispatch({ type: "ADD_TO_CART", product: prod })
                }
                disabled={!prod.inStock}
              >
                <span className="material-icons"> add_shopping_cart </span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
