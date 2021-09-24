import React from "react";
import { data } from "../data";
import "../styles/productDetails.css";

export function ProductDetails() {
  return (
    <div className="product-details">
      <img className="pd-image-container" src={data[15].image} alt="" />
      <div className="pd-details-container">
        <h3>alksldkfslkfjasl</h3>
        <p>sold by shashsashshs</p>
        <p>Ratings 5 stars</p>
        <p>Rs. 6546</p>
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
        <button>buy</button>
        <button>add to cart</button>
      </div>
    </div>
  );
}
