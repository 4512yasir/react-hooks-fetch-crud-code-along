import React from "react";

function Item({ item ,onUpdateItem,onDeleteItem}) {
  //on click of add to cart button the text should be changed and it should be sent to the db
const handleAddToCartClick=()=>{
  console.log("clicked item",item)
  fetch(`http://localhost:4000/items/${item.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
  .then((r) => r.json())
  .then((updatedItem) =>onUpdateItem(updatedItem));
}

function handleDeleteClick() {
  console.log("handle dellet",item);

  fetch(`http://localhost:4000/items/${item.id}`,{
    method:"DELETE"
  })
  .then(res=>res.json)
  .then(()=>onDeleteItem(item))
}
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick}className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;