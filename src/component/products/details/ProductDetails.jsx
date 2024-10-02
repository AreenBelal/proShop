import React, { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./productDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import OperationCart from "../../common/design/OperationCart";
import { getProducts } from "../../common/function/GetRequest";
import {
  CircleColor,
  ContainerDetails,
  Contant,
  DeatilsTitle,
  DiscountSale,
  IconWish,
  Price,
  SalesDetails,
  TableContainer,
  TextDetails,
} from "../../common/styled_comp/divStyles.style";
import {
  AddCartButton,
  SizeButton,
} from "../../common/styled_comp/Button.style";
import { MainImage, SubImage } from "../../common/styled_comp/Image.style";
import { handleAdd, handleWishList } from "../../common/function/ReduxOP";
import { useDispatch } from "react-redux";

// Lazy load the components
const TableComponent = React.lazy(() => import("../../common/function/TableComponent"));
const FeaturedProducts = React.lazy(() => import("../featuedProduct/FeaturedProducts"));

function ProductDetails() {
  const { id } = useParams();
  const [allProd, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSize] = useState("");
  const [active, setActive] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(setProducts, setError, setLoading);
  }, []);

  useEffect(() => {
    if (allProd?.length) {
      const product = allProd?.find((item) => item.id === parseInt(id));
      setProductDetails(product);
      if (product?.sizes?.length) {
        setSize(product?.sizes[0]);
      } else {
        setSize('');  
      }
    }
 
  }, [id, allProd]);

  const handleSize = (size, index) => {
    setSize(size);
    setActive(index);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }

  if (!productDetails) {
    return <p>Product not found!</p>;
  }

  const productImage = productDetails.image || '';
  const productName = productDetails.name || '';
  const productPrice = productDetails.price || 0;
  const productDiscount = productDetails.discount || 0;

  return (
    <>
      <ContainerDetails>
        <Link to="/mainpage" className={styles.Back}>
          Back / {productName}
        </Link>

        <div className="d-flex justify-content-between mt-5 content">
          <div className="d-flex flex-column justify-content-between me-5">
            <MainImage src={`/${productImage}`} alt="product" />

            <div className="d-flex justify-content-between">
              <SubImage src={`/${productImage}`} alt="product" />
              <SubImage src={`/${productImage}`} alt="product" />
              <SubImage src={`/${productImage}`} alt="product" />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-between ms-3">
            <div className="d-flex justify-content-between">
              <DeatilsTitle>{productName}</DeatilsTitle>
              {!productDiscount && <Price> ${productPrice} </Price>}
              {productDiscount > 0 && (
                <SalesDetails className="my-3">
                  ${productPrice}
                </SalesDetails>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <OperationCart product={productDetails} selectedSize={selectedSize} />

              {productDiscount > 0 && (
                <div className="d-flex flex-column justify-content-between ">
                  <DiscountSale>{productDiscount}% Sale</DiscountSale>
                  <DeatilsTitle style={{ textAlign: "right" }}>
                    ${productPrice - (productPrice * productDiscount) / 100}
                  </DeatilsTitle>
                </div>
              )}
            </div>

            <TextDetails className="mt-5">
              Color: <span>{productDetails?.color || ''}</span>
            </TextDetails>
            <CircleColor />

            <TextDetails className="mt-5">
              Size: <span>{selectedSize}</span>
            </TextDetails>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex ">
                {productDetails?.sizes?.map((size, index) => (
                  <SizeButton
                    key={index}
                    className={active === index ? styles.size_clicked : ""}
                    onClick={() => handleSize(size, index)}
                  >
                    <p>{size} </p>
                  </SizeButton>
                ))}
              </div>

              <div className="d-flex ms-auto">
                <IconWish
                  onClick={() => {
                    handleWishList(dispatch, productDetails);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="fs-4 position-absolute top-50 start-50 translate-middle"
                  />
                </IconWish>

                <AddCartButton
                  onClick={() => handleAdd(dispatch, productDetails, selectedSize)}
                >
                  Add to cart
                </AddCartButton>
              </div>
            </div>

            <div className={styles.paragrahDetails}>
              Et placeat odio voluptas saepe ullam enim sed. Sint rem sint. Ex
              enim aperiam consequatur. Est temporibus ab. Pariatur aut ut
              temporibus culpa. Aut adipisci veniam esse. Quidem dolor corporis
              consequuntur non sunt et neque. Aut dolorem repellat quo
              architecto sint minima doloremque.
            </div>
          </div>
        </div>

        <TableContainer>
          <p className="title">Specification</p>
          <Contant>
            <p>Technical Details</p>
            <Suspense fallback={<div>Loading specifications...</div>}>
              <TableComponent productDetails={productDetails} />
            </Suspense>
          </Contant>
        </TableContainer>
      </ContainerDetails>

      <Suspense fallback={<div>Loading featured products...</div>}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}

export default ProductDetails;
