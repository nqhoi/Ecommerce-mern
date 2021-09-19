import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";
import "./ProductItem.css";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  
  
  return (
    <div className="productItem">
      <div className="product__card">
        {
          isAdmin && <input  type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)} />
        }

        <Link to={`/detail/${product._id}`}>
          <img src={product.images.url} alt="" />
        
        </Link>

        <div className="product__card-box">
          <h2 title={product.title}>{product.title}</h2>
          <span>${product.price}</span>
          <p>{product.description}</p>
        </div>

        <BtnRender product={product} deleteProduct={deleteProduct}  />

      </div>
    </div>
  );
}

export default ProductItem;
