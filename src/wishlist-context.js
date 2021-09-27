import { createContext, useContext, useReducer } from "react";

const WishList = createContext();

function wishListReducer(state, payload) {
  switch (payload.type) {
    case "ADD_TO_WISHLIST":
      if (state.length) {
        let duplicateItem = state.find(
          (item) => item.id === payload.product.id
        );
        if (duplicateItem) {
          return state.map((item) =>
            item.id === duplicateItem.id
              ? {
                  ...duplicateItem,
                  inWishList: !duplicateItem.inWishList,
                }
              : item
          );
        } else {
          return [
            ...state,
            {
              ...payload.product,
              inWishList: true,
            },
          ];
        }
      } else {
        return [{ ...payload.product, inWishList: true }];
      }
    default:
      return state;
  }
}

export function WishListProvider({ children }) {
  const [wishListData, wishListDispatch] = useReducer(wishListReducer, []);
  return (
    <WishList.Provider value={{ wishListData, wishListDispatch }}>
      {children}
    </WishList.Provider>
  );
}

export function useWishList() {
  return useContext(WishList);
}
