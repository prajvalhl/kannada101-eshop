import { createContext, useContext, useReducer } from "react";

const Cart = createContext();

function cartReducer(state, payload) {
  switch (payload.type) {
    case "ADD_TO_CART":
      if (state.length) {
        let duplicateItem = state.find(
          (item) => item.id === payload.product.id
        );
        if (duplicateItem) {
          return state.map((item) =>
            item.id === duplicateItem.id
              ? {
                  ...duplicateItem,
                  quantity: duplicateItem.quantity + 1,
                }
              : item
          );
        } else {
          return [
            ...state,
            {
              ...payload.product,
              quantity: (payload.product.quantity || 0) + 1,
            },
          ];
        }
      } else {
        return [
          { ...payload.product, quantity: (payload.product.quantity || 0) + 1 },
        ];
      }
    case "INCREMENT":
      return state.map((item) =>
        item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case "DECREMENT":
      return state.map((item) =>
        item.id === payload.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    case "REMOVE":
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);
  console.log(state);
  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
}

export function useCart() {
  return useContext(Cart);
}
