import React, { useReducer } from "react";
import { data } from "../data";
import { useCart } from "../cart-context";

function sortProducts(state, action) {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };
    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
    case "RANGE_SLIDER":
      return { ...state, rangeVal: Number(action.payload) };
    default:
      return state;
  }
}

function getSortedData(productsList, sortBy) {
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return productsList.sort((a, b) => a.price - b.price);
  }
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    return productsList.sort((a, b) => b.price - a.price);
  }
  return productsList;
}

function getFliteredData1(
  productsList,
  { showInventoryAll, showFastDeliveryOnly }
) {
  return productsList
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true))
    .filter(({ inStock }) => (showInventoryAll ? true : inStock));
}

function getFliteredData2(productsList, rangeVal) {
  return productsList.filter(({ price }) => price < rangeVal);
}

export function ProductListing() {
  const { dispatch } = useCart();

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy, rangeVal },
    dispatchLocal,
  ] = useReducer(sortProducts, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: null,
    rangeVal: 1000,
  });

  const sortedData = getSortedData(data, sortBy);
  const filter1 = getFliteredData1(sortedData, {
    showInventoryAll,
    showFastDeliveryOnly,
  });
  const filteredData = getFliteredData2(filter1, rangeVal);

  return (
    <div>
      <div>
        <fieldset>
          <legend>Sort By</legend>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatchLocal({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            />
            Price - Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatchLocal({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            />
            Price - High to Low
          </label>
        </fieldset>
        <fieldset>
          <legend>Filters</legend>
          <label>
            <input
              type="checkbox"
              onChange={() => dispatchLocal({ type: "TOGGLE_INVENTORY" })}
              checked={showInventoryAll}
            />
            Include Out of Stock
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => dispatchLocal({ type: "TOGGLE_DELIVERY" })}
              checked={showFastDeliveryOnly}
            />
            Fast Delivery Only
          </label>
          <br />
          <label>
            Price Range
            <input
              type="range"
              min="50"
              max="1000"
              value={rangeVal}
              onChange={(e) =>
                dispatchLocal({ type: "RANGE_SLIDER", payload: e.target.value })
              }
            />
          </label>
        </fieldset>
      </div>
      <div>
        <h1>Kannada101-Products</h1>
        <div className="all-products">
          {filteredData.map((prod) => (
            <div key={prod.id} className="product">
              <img
                src={prod.image}
                width="150px"
                height="auto"
                alt={prod.name}
              />
              <h3>{prod.name}</h3>
              <small>by {prod.brand}</small>
              <div>Rating: {prod.ratings}</div>
              <p>{prod.inStock ? "In Stock" : "Out Of Stock"}</p>
              <div className="product-bottom">
                <p>Rs. {prod.price}</p>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", product: prod })
                  }
                >
                  add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
