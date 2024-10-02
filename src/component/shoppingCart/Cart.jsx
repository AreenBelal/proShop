import React from "react";
import styles from "../products/details/productDetails.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OperationCart from "../common/design/OperationCart";
import {
  CartTitle,
  ContainerDetails,
  DeatilsTitle,
  Layout,
  Price,
  SalesDetails,
  SecondCon,
} from "../common/styled_comp/divStyles.style";
import { StartPayButton } from "../common/styled_comp/Button.style";
import { handleDec } from "../common/function/ReduxOP";
import { CartImage } from "../common/styled_comp/Image.style";

function Cart() {
  let cart = useSelector((state) => state.Ecommerce.cart);
  let dispatch = useDispatch();

  let Totalprice = cart.reduce((total, item) => total + item.totalprice, 0);
  let PricesAfterDiscount = cart.reduce(
    (total, item) => total + item.totalPriceAfterDiscount,
    0
  );

  return (
    <ContainerDetails>
      <Link to="/mainpage" className={styles.Back}>
        Back / Shopping Cart
      </Link>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-9">
            {cart?.map((item) => {
              return (
                <>
                  <Layout key={item.id}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <CartImage
                        src={item.image}
                        alt="itemImage"
                      />

                      <div className="fs-6 fst-italic fw-bolder">
                        Size:
                        {item.selectedSize ? item.selectedSize : "one Size"}
                      </div>
                    </div>

                    <CartTitle> {item.name}</CartTitle>

                    <div className="my-auto">
                      <OperationCart
                        product={item}
                        selectedSize={item.selectedSize}
                      />{" "}
                    </div>

                    <div className="d-flex flex-column text-center my-auto">
                      {item.discount > 0 ? (
                        <SalesDetails className="text-center">
                          ${(item.price).toFixed(2)}
                        </SalesDetails>
                      ) : (
                        " "
                      )}

                      <Price className="mt-3">
                      ${((item.price - (item.price * item.discount) / 100).toFixed(2))}
                    </Price>
                    
                    
                    </div>

                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0 mt-2 me-2"
                      aria-label="Close"
                      onClick={() =>
                        handleDec(dispatch, item, item.selectedSize)
                      }
                    />
                  </Layout>
                </>
              );
            })}
          </div>

          <SecondCon className="col-md-3">
            <div className="ms-4 subtotal">Subtotal ({cart.length}) items</div>
            <SalesDetails className="mt-5  ms-4 me-auto">
              ${(PricesAfterDiscount).toFixed(2)}
            </SalesDetails>
            <DeatilsTitle className=" mt-3  mb-4 ms-4  me-auto">
              {" "}
              ${(Totalprice).toFixed(2)}
            </DeatilsTitle>

            <div className="border border-secondary opacity-25 my-3" />
            <StartPayButton className="mt-2 mb-3 ">
              Proceed to checkout
            </StartPayButton>
          </SecondCon>
        </div>
      </div>
    </ContainerDetails>
  );
}

export default Cart;
