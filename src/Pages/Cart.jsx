import React, { useEffect, useState } from 'react';
import { AllCart, removeAllCartElement } from '../state/allcartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import OperationCart from '../component/OperationCart';

const Cart = () => {
  const [CartItems, setCartItems] = useState([]); 

  const { carts } = useSelector((state) => state.cart);
  const userId = Object.keys(carts)[0]; 
  const userCart = Object.values(carts)[0]; 

  const { localcart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (isAuthenticated) {
      setCartItems(userCart); // Set the user's cart if authenticated
    } else {
      setCartItems(localcart); // Set the local cart if not authenticated
    }
  }, [isAuthenticated, localcart, userCart]); 

  const dispatch = useDispatch();  

  let subtotal = CartItems?.reduce(
    (total, item) => total + item.totalPriceAfterDiscount,
    0
  );

  if (isNaN(subtotal)) {
    subtotal = 0;
  }

  const handleRemove = (product) => {
    const selectedSize = product?.selectedSize;

    if (selectedSize) {
      dispatch(removeAllCartElement({ product, selectedSize, userId }));
    } else {
      console.error("Selected size is not defined for product:", product);
    }
  };

  return (
    <div className="container mt-5">
      <Link
        to="/"
        className="btn btn-link text-decoration-none mb-5 text-dark fw-bold"
        style={{ backgroundColor: "#FCDD06" }}
      >
        &larr; Back to Shopping
      </Link>

      <div className="row">
        <div className="col-md-9">

        {CartItems?.length > 0 ? (
            CartItems?.map((product) => (
              <div
                key={product.id}
                className="row mb-3 position-relative shadow hover-shadow p-3 border-0 rounded me-2 justify-content-evenly align-items-center"
              >
                <div className="col-md-3 text-center">
                  <img src={product.image} className="img-fluid rounded" />
                </div>

                <div className="col-md-4">
                  <h5 className="card-title">{product.name}</h5>
                  <p
                    className="size-tag fw-bold rounded mt-4"
                    style={{ width: "fit-content" }}
                  >
                    {product.selectedSize || "One Size"}
                  </p>

                  <div className="mt-4 d-flex align-items-center justify-content-between">

                  {product.discount > 0 && (
                      <div className="text-decoration-line-through text-danger fw-bold">
                        ${(Number(product?.price) || 0).toFixed(2)}
                      </div>
                    )}

                    <FontAwesomeIcon icon={faShare} style={{color: "#FFD43B",}}  />

                    <div className="price text-success fs-5 fw-bold">
                      $
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="col-md-3 me-2">
                  <OperationCart
                    product={product}
                    selectedSize={product.selectedSize}
                  />

                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 mt-2 me-2"
                    aria-label="Remove"
                    onClick={() => handleRemove(product)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5 className="text-muted">Your cart is empty.</h5>
            </div>
          )}
        </div>

        <div
          className="col-md-3 text-center border p-3 rounded shadow-sm"
          style={{ maxHeight: "250px" }}
        >
          <h5>Order Summary</h5>

          <div className="d-flex flex-column justify-content-between mt-2">
            <span>Subtotal ({CartItems?.length} items)</span>
            <span className="fs-4">${subtotal || 0}</span>
          </div>

          {/* Checkout and Reset buttons */}
          <button
            className="btn mt-4 w-100 fw-bolder"
            style={{ backgroundColor: "#FCDD06" }}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn mt-2 w-100 fw-bolder bg-danger text-light"
            onClick={() => dispatch(AllCart({ userId }))}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
