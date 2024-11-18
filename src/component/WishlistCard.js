import React from 'react'
import '../Pages/wishlist/style.css'
import "animate.css";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToCartAsync } from '../state/allcartSlice';
import { deleteWishlist } from '../state/allwishSlice';

const WishlistCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;

  return (
    <div className="card mb-4 animate__animated animate__fadeIn card-horizontal">
      <div className="row g-0">
  
        <div className="col-md-5">
          <img
            src={product.image}
            className="img-fluid rounded-start card-img-horizontal"
            alt="Product"
          />
        </div>
        
   
        <div className="col-md-6 ms-3">
          <div className="card-body d-flex flex-column justify-content-center">
            
          <div>
              <h5 className="card-title mb-3">{product.name}</h5>
         
                <p className="size-tag fw-bold rounded my-3" style={{width: 'fit-content'}}>{product.selectedSize || "One Size"}</p>
              
              <p className="card-text price fw-bold">${Number(product?.price).toFixed(2)}</p>
            </div>

   
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => dispatch(addToCartAsync({ userId, product, selectedSize }))}
                className="btn btn-outline-success btn-sm me-2 btn-rounded btn-rounded-success"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-0" style={{ fontSize: "1.2em" }} />
              </button>

              <button
                type="button"
                onClick={() => dispatch(deleteWishlist({ userId, product, selectedSize }))}
                className="btn btn-outline-danger btn-sm btn-rounded btn-rounded-danger"
              >
                <FontAwesomeIcon icon={faTrash} className="me-0" style={{ fontSize: "1.2em" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
