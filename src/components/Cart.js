import React from "react";
import { useCart } from "../cart-context";
import { useNav } from "../navigation-context";
import { giveBackgroundColor } from "../cart-context";

function CartEmpty() {
  const { setRoute } = useNav();

  return (
    <div className="cart-empty-banner">
      <p className="fs fs-1">Your Cart is empty.</p>
      <p className="fs fs-4">
        Check your Wish List or{" "}
        <span
          className="cart-empty-continue-shopping"
          onClick={() => setRoute("product")}
        >
          continue shopping
        </span>
        .
      </p>
    </div>
  );
}

export function Cart() {
  const { state, dispatch } = useCart();

  const total = state.reduce((acc, value) => {
    return value.quantity && (acc = acc + value.quantity * value.price);
  }, 0);

  return (
    <div>
      <div className="all-cart-items">
        {state.length === 0 ? (
          <CartEmpty />
        ) : (
          state.map((cart) => (
            <div key={cart.id} className="card-horizontal">
              <img
                src={cart.image}
                alt={cart.name}
                className={!cart.inStock ? "out-of-stock-image" : undefined}
              />
              <p
                style={{ display: !cart.inStock ? "block" : "none" }}
                className="out-of-stock-text out-of-stock-text-horizontal"
              >
                OUT <br /> OF <br /> STOCK
              </p>
              <div
                className="rating horizontal-rating"
                style={{ backgroundColor: giveBackgroundColor(cart.ratings) }}
              >
                <p>{cart.ratings}</p>
                <span className="material-icons"> star_rate </span>
              </div>
              <div className="hori-resp">
                <p className="ptext p-head">{cart.name}</p>
                <p className="ptext p-dec">
                  {cart.inStock ? "In Stock" : "Out Of Stock"}
                </p>
                <p className="ptext p-dec">
                  {cart.fastDelivery ? "✔ Fast Delivery" : "7-Day Delivery"}
                </p>
                <p className="ptext p-price">₹{cart.price}</p>
                <div className="div-quantity">
                  <button
                    className="btn-hCard"
                    onClick={() =>
                      dispatch({
                        type: "DECREMENT",
                        itemDetail: { id: cart.id, quantity: cart.quantity },
                      })
                    }
                  >
                    -
                  </button>
                  <span className="qty_btw_inc_dec">{cart.quantity}</span>
                  <button
                    className="btn-hCard"
                    onClick={() => dispatch({ type: "INCREMENT", id: cart.id })}
                  >
                    +
                  </button>
                  <button
                    className="btn-hCard h-remove"
                    onClick={() => dispatch({ type: "REMOVE", id: cart.id })}
                  >
                    Remove
                  </button>
                </div>
                <p className="ptext p-price total-inCart">
                  ₹{cart.price * cart.quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-total-inCheck">
        <p>
          Cart Total <strong>₹{total}</strong>{" "}
        </p>
        <button>Checkout &gt;&gt;</button>
      </div>
    </div>
  );
}
