import React, { useState } from "react";
const data = [
  { id: 1, name: "item 1" },
  { id: 2, name: "item 2" },
];

export function ProductListing() {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <h1>kannada101-Products</h1>
      {data.map((prod) => (
        <div key={prod.id}>
          <h3>{prod.name}</h3>
          <button
            onClick={() =>
              setCart((prevCart) => {
                if (prevCart.length) {
                  console.log("prevCart is not empty");

                  let duplicateItem = prevCart.find(
                    (item) => item.id === prod.id
                  );
                  if (duplicateItem) {
                    return prevCart.map((item) =>
                      item.id === duplicateItem.id
                        ? {
                            ...duplicateItem,
                            quantity: duplicateItem.quantity + 1,
                          }
                        : item
                    );
                  } else {
                    console.log("duplicate not found");
                    return [
                      ...prevCart,
                      { ...prod, quantity: (prod.quantity || 0) + 1 },
                    ];
                  }
                } else {
                  console.log("prevCart is empty");
                  return [{ ...prod, quantity: (prod.quantity || 0) + 1 }];
                }
              })
            }
          >
            add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
