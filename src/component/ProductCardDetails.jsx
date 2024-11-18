import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { AfterSale, Badge, Price } from "./styled_component/div.style";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToCart, WishList } from './styled_component/button.style';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../state/allcartSlice';

import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';  
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { addToWishlist, deleteWishlist } from '../state/allwishSlice';

const ProductCardDetails = ({ product }) => {
    const dispatch = useDispatch();
    
    const [isInWishlist, setIsInWishlist] = useState(false);
    const selectedSize = product?.sizes[0];
    const { user } = useSelector((state) => state.auth);
    const userId = user?.id;
  
    const { wishlist } = useSelector((state) => state.wishlist);
      const userWishList = wishlist?.[1] || [];  
  
      useEffect(() => {
        const isProductInWishlist =   userWishList.find((item)=> item.id === product.id)
        setIsInWishlist(isProductInWishlist);
    }, [product]);
  
    const toggleWishlist = () => {
      setIsInWishlist(prevState => {
        const newState = !prevState;
  
        if (newState) {
          dispatch(addToWishlist({ product, selectedSize, userId }));
        } else {
          dispatch(deleteWishlist({ product, selectedSize, userId }));
        }
  
        return newState;  
      });
    };
  
   
  
    return (
      <div className="card w-100 d-flex flex-column justify-content-between" style={{ height: "480px" }}>
        <Link to={`products/${product.id}`}>
          <img
            src={product.image}
            alt="product-Image"
            className="position-relative w-100"
            style={{ objectFit: "cover", height: "200px" }}
          />
        </Link>
  
        {product.discount > 0 && (
          <Badge>
            <div>{product.discount}%</div>
          </Badge>
        )}
  
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-center mt-3">{product.name}</h5>
  
          <div className="text-center mb-5 mt-2">
            <StarRatings
              rating={product.rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
          </div>
  
          {product.discount > 0 ? (
            <div className="d-flex justify-content-center">
              <AfterSale>
                ${((product.price - (product.price * product.discount) / 100)).toFixed(2)}
              </AfterSale>
              <Price>${product.price}</Price>
            </div>
          ) : (
            <Price className="text-decoration-none">
              ${product.price}
            </Price>
          )}
  
          <div className='d-flex justify-content-between align-items-center w-100 mt-auto'>
            <WishList onClick={toggleWishlist}>
              <FontAwesomeIcon 
                icon={isInWishlist ? solidHeart : regularHeart} 
                style={{ color: "#FFD43B" }} 
                className="fs-5" 
              />
            </WishList>
            
            <AddToCart onClick={()=>{dispatch(addToCartAsync({ userId, product, selectedSize}))}}>
              <div>Add to cart</div>
            </AddToCart>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCardDetails;