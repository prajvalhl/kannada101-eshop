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
      if (payload.itemDetail.quantity !== 0) {
        return state.map((item) =>
          item.id === payload.itemDetail.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return state.filter((item) => item.id !== payload.itemDetail.id);
      }
    case "REMOVE":
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, cartDispatch] = useReducer(cartReducer, []);
  return (
    <Cart.Provider value={{ state, cartDispatch }}>{children}</Cart.Provider>
  );
}

export function useCart() {
  return useContext(Cart);
}

export function giveRatingsBgColor(rating) {
  if (rating < 1.5) {
    return "var(--custom-red)";
  } else if (rating < 3.5) {
    return "var(--custom-yellow)";
  } else {
    return "var(--custom-green)";
  }
}
