import React from "react";
import { useDispatch } from "react-redux";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, WishList } from "../styled_comp/Button.style";
import { Container, CartText } from "../styled_comp/divStyles.style";
import { handleAdd, handleWishList } from "../function/ReduxOP";

function BottomCard({ product,selectedSize}) {
 

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  return (
    <Container>
      <WishList
        onClick={() => {
          handleWishList(dispatch,product);
        }}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </WishList>

      <Button onClick={() => handleAdd(dispatch,product,selectedSize)}>
        <CartText>Add to cart</CartText>
      </Button>
    </Container>
  );
}

export default BottomCard;
