import React from "react";
import { data } from "../data";
import { giveRatingsBgColor } from "../cart-context";
import { useCart } from "../cart-context";
import { Link, useParams } from "react-router-dom";
import "../styles/productDetails.css";

export function ProductDetails() {
  const { productId } = useParams();
  const product = data.find((product) => product.id === Number(productId));
  const { cartDispatch } = useCart();

  return (
    <div className="product-details">
      <img
        className="pd-image-container"
        src={product.image}
        alt={product.image}
      />
      <button className="btn btn-primary btn-icon add-to-wishlist pd-wishlist">
        <span className="material-icons"> favorite </span>
      </button>
      <div className="pd-details-container">
        <h3>{product.name}</h3>
        <p>sold by {product.brand}</p>
        <div
          className="rating pd-rating"
          style={{ backgroundColor: giveRatingsBgColor(product.ratings) }}
        >
          <p>{product.ratings}</p>
          <span className="material-icons"> star_rate </span>
        </div>
        <p>
          ₹ {product.price}{" "}
          <strong> {!product.inStock && "Currently Out Of Stock"}</strong>
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aperiam.
          Quidem dicta, architecto quo numquam veniam magni earum eveniet soluta
          velit autem officiis nihil laudantium fuga. Iusto necessitatibus harum
          ullam. Quis vel fugiat nisi alias. Tenetur voluptatum quae maxime?
          Ullam placeat impedit quam, repudiandae doloremque blanditiis itaque
          asperiores numquam sapiente quasi suscipit molestias! Natus vitae,
          maxime quis saepe doloribus expedita? Obcaecati consectetur mollitia
          deserunt blanditiis, quod dolore eveniet distinctio minima asperiores,
          possimus temporibus praesentium! Placeat ipsum illum maxime
          repellendus cumque recusandae magnam dolore, voluptatibus, tempora
          perferendis sequi odit quis quaerat. Culpa repudiandae maxime deserunt
          sequi temporibus excepturi ut ullam asperiores at maiores, dicta quas
          blanditiis facere iure illum. Illum aliquam repellat quia consequatur
          culpa sit totam commodi maxime neque ex. Sequi magnam veniam porro
          magni eaque dicta natus aspernatur facere reprehenderit, officiis
          impedit dolore sapiente, voluptas vel dolor, quasi sed. Corporis nihil
          quaerat magnam, ex eaque vel saepe. Amet, mollitia?
        </p>
        <div className="pd-buttons">
          {/* <a
            className="link link-primary"
            href="/buy"
            target="_blank"
            rel="noreferrer"
          >
            Buy
          </a> */}
          <Link className="link link-primary" to="/buy">
            Buy
          </Link>
          <button
            className={`link link-secondary ${
              !product.inStock && "add-to-cart-out-of-stock"
            }`}
            onClick={() =>
              cartDispatch({ type: "ADD_TO_CART", product: product })
            }
            disabled={!product.inStock}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
