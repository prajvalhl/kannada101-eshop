import React, { useReducer, useState } from "react";
import { data } from "../data";
import { useCart } from "../cart-context";
import { giveBackgroundColor } from "../cart-context";

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
  const [showFilter, setShowFilter] = useState(false);

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy, rangeVal },
    dispatchLocal,
  ] = useReducer(sortProducts, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: "normal",
    rangeVal: 1000,
  });

  const sortedData = getSortedData(data, sortBy);
  const filter1 = getFliteredData1(sortedData, {
    showInventoryAll,
    showFastDeliveryOnly,
  });
  const filteredData = getFliteredData2(filter1, rangeVal);

  return (
    <div className="productListings">
      <div>
        <div
          className="filters"
          style={{ display: showFilter ? "block" : "none" }}
        >
          <p>Filters</p>
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
          <label>
            Price Range
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={rangeVal}
              onChange={(e) =>
                dispatchLocal({
                  type: "RANGE_SLIDER",
                  payload: e.target.value,
                })
              }
            />
            <p>₹{rangeVal}</p>
          </label>
        </div>
      </div>
      <div>
        <div className="all-items">
          {filteredData.map((prod) => (
            <div key={prod.id} className="card-vertical">
              <img src={prod.image} alt={prod.name} />
              <div>
                <p className="ptext p-head">{prod.name}</p>
                <div
                  className="rating vertical-rating"
                  style={{ backgroundColor: giveBackgroundColor(prod.ratings) }}
                >
                  <p>{prod.ratings}</p>
                  <span className="material-icons"> star_rate </span>
                </div>
                <p className="ptext p-dec">
                  {prod.inStock ? "In Stock" : "Out Of Stock"}
                </p>
                <p className="ptext p-dec">
                  {prod.fastDelivery ? "Fast Delivery" : "Slow Delivery"}
                </p>
                <p className="ptext p-price">₹{prod.price}</p>
                <button
                  className="btn btn-primary btn-icon add-to-cart"
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", product: prod })
                  }
                >
                  <span className="material-icons"> shopping_cart </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="btn-float float-fix"
        onClick={() => setShowFilter(!showFilter)}
      >
        <span className="material-icons"> filter_alt </span>
      </button>
    </div>
  );
}
