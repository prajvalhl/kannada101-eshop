import React from "react";
import { CartProvider, useCart } from "../cart-context";

export function Cart() {
  const { state, dispatch } = useCart();

  return (
    <div>
      <h1>kannada101-Cart</h1>
      <div className="all-carts-items">
        {state.map((cart) => (
          <div key={cart.id} className="cart">
            <img src={cart.image} width="200px" height="auto" alt={cart.name} />
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
