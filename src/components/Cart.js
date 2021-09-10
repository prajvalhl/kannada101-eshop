import React from "react";
import { CartProvider, useCart } from "../cart-context";

export function Cart() {
  const { state, dispatch } = useCart();

  const total = state.reduce((acc, value) => {
    return value.quantity && (acc = acc + value.quantity * value.price);
  }, 0);

  return (
    <div>
      <h1>Cart Total: {total}</h1>
      <div className="all-items">
        {state.map((cart) => (
          <div key={cart.id} className="item">
            <img src={cart.image} width="150px" height="auto" alt={cart.name} />
            <h3>{cart.name}</h3>
            <small>by {cart.brand}</small>
            <div>Rating: {cart.ratings}</div>
            <p>Rs. {cart.price}</p>
            <button
              onClick={() => dispatch({ type: "INCREMENT", id: cart.id })}
            >
              +
            </button>
            <span>{cart.quantity}</span>
            <button
              onClick={() =>
                dispatch({
                  type: "DECREMENT",
                  itemDetail: { id: cart.id, quantity: cart.quantity },
                })
              }
            >
              -
            </button>
            <button onClick={() => dispatch({ type: "REMOVE", id: cart.id })}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
