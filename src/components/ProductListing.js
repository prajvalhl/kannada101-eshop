import React, { useReducer, useState } from "react";
import { data } from "../data";
import { useCart } from "../cart-context";
import { giveRatingsBgColor } from "../cart-context";
import { Link } from "react-router-dom";

function sortProducts(state, action) {
  switch (action.type) {
    case "SORT_PRICE":
      return { ...state, sortByPrice: action.payload };
    case "SORT_LEVEL":
      return { ...state, sortByLevel: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };
    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
    case "RANGE_SLIDER":
      return { ...state, rangeVal: Number(action.payload) };
    case "RESET_FILTER":
      return {
        showInventoryAll: true,
        showFastDeliveryOnly: false,
        sortByPrice: "NO_SORT",
        rangeVal: 1000,
        sortByLevel: "NO_LEVEL",
      };
    default:
      return state;
  }
}

function getSortedPriceData(productsList, sortByPrice) {
  if (sortByPrice && sortByPrice === "PRICE_LOW_TO_HIGH") {
    return productsList.sort((a, b) => a.price - b.price);
  }
  if (sortByPrice && sortByPrice === "PRICE_HIGH_TO_LOW") {
    return productsList.sort((a, b) => b.price - a.price);
  }
  return productsList;
}

function getSortedLevelData(productList, sortByLevel) {
  if (sortByLevel && sortByLevel === "BEGINNER") {
    return productList.filter(({ level }) => level === "beginner");
  } else if (sortByLevel && sortByLevel === "INTERMEDIATE") {
    return productList.filter(({ level }) => level === "intermediate");
  } else if (sortByLevel && sortByLevel === "ADVANCED") {
    return productList.filter(({ level }) => level === "advanced");
  } else {
    return productList;
  }
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
  const { cartDispatch } = useCart();
  const [showFilter, setShowFilter] = useState(false);

  const [
    {
      showInventoryAll,
      showFastDeliveryOnly,
      sortByPrice,
      rangeVal,
      sortByLevel,
    },
    dispatchLocal,
  ] = useReducer(sortProducts, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortByPrice: "NO_SORT",
    rangeVal: 1000,
    sortByLevel: "NO_LEVEL",
  });

  const priceSortedData = getSortedPriceData(data, sortByPrice);
  const otherFilteredData = getFliteredData1(priceSortedData, {
    showInventoryAll,
    showFastDeliveryOnly,
  });
  const rangeSetData = getFliteredData2(otherFilteredData, rangeVal);
  const filteredData = getSortedLevelData(rangeSetData, sortByLevel);

  return (
    <div className="productListings">
      <div>
        <div
          className="filters"
          style={{ display: showFilter ? "block" : "none" }}
        >
          <p className="filter-title-center">Filters</p>
          <p className="filter-sub-title">Level</p>
          <label>
            <input
              type="radio"
              name="level"
              onChange={() =>
                dispatchLocal({
                  type: "SORT_LEVEL",
                  payload: "BEGINNER",
                })
              }
              checked={sortByLevel && sortByLevel === "BEGINNER"}
            />
            Beginner
          </label>
          <label>
            <input
              type="radio"
              name="level"
              onChange={() =>
                dispatchLocal({
                  type: "SORT_LEVEL",
                  payload: "INTERMEDIATE",
                })
              }
              checked={sortByLevel && sortByLevel === "INTERMEDIATE"}
            />
            Intermediate
          </label>
          <label>
            <input
              type="radio"
              name="level"
              onChange={() =>
                dispatchLocal({
                  type: "SORT_LEVEL",
                  payload: "ADVANCED",
                })
              }
              checked={sortByLevel && sortByLevel === "ADVANCED"}
            />
            Advanced
          </label>
          <p className="filter-sub-title">Others</p>
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
          <p className="filter-sub-title">Price</p>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatchLocal({
                  type: "SORT_PRICE",
                  payload: "PRICE_LOW_TO_HIGH",
                })
              }
              checked={sortByPrice && sortByPrice === "PRICE_LOW_TO_HIGH"}
            />
            Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatchLocal({
                  type: "SORT_PRICE",
                  payload: "PRICE_HIGH_TO_LOW",
                })
              }
              checked={sortByPrice && sortByPrice === "PRICE_HIGH_TO_LOW"}
            />
            High to Low
          </label>
          <label>
            Price Range
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={rangeVal}
              onChange={(e) =>
                dispatchLocal({
                  type: "RANGE_SLIDER",
                  payload: e.target.value,
                })
              }
            />
            <p className="filter-title-center">₹{rangeVal}</p>
          </label>
          <label>
            <p
              className="filter-clear"
              onClick={() => dispatchLocal({ type: "RESET_FILTER" })}
            >
              Reset All Filters
            </p>
          </label>
        </div>
      </div>
      <div>
        <div
          className="all-productListing-items"
          onClick={() => setShowFilter(false)}
        >
          {filteredData.map((prod) => (
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
                    cartDispatch({ type: "ADD_TO_CART", product: prod })
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
