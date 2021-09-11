import React from "react";
import { useCart } from "../cart-context";
import { giveBackgroundColor } from "../cart-context";

export function Cart() {
  const { state, dispatch } = useCart();

  const total = state.reduce((acc, value) => {
    return value.quantity && (acc = acc + value.quantity * value.price);
  }, 0);

  return (
    <div>
      <h1>Cart Total: ₹{total}</h1>
      <div className="all-cart-items">
        {state.map((cart) => (
          <div key={cart.id} className="card-horizontal">
            <img src={cart.image} alt={cart.name} />
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
                {cart.fastDelivery ? "Fast Delivery" : "Slow Delivery"}
              </p>
              <p className="ptext p-price">₹{cart.price}</p>
              <div className="div-quantity">
                <button
                  className="btn-hCard"
                  onClick={() => dispatch({ type: "INCREMENT", id: cart.id })}
                >
                  +
                </button>
                <span>{cart.quantity}</span>
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
                <button
                  className="btn-hCard h-remove"
                  onClick={() => dispatch({ type: "REMOVE", id: cart.id })}
                >
                  Remove
                </button>
              </div>
              <p className="ptext p-price total-inCart">
                Total ₹{cart.price * cart.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
