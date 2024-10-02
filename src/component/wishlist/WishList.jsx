import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ImageWishList } from '../common/styled_comp/Image.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonIconWishList } from '../common/styled_comp/Button.style';
import {DELWISH } from '../Redux/action/types';
import { Card } from '../common/styled_comp/divStyles.style';
import styles from "../products/details/productDetails.module.css";


function WishList() {

  let items = useSelector((state) => state.Ecommerce.wishlist); 
  let dispatch = useDispatch();

  let handleDelete = (data) =>{
    dispatch({
      type: DELWISH,
      payload: data,
    });
  }

  return (
    <div className='container mt-5'> 
    <Link to="/mainpage" className={styles.Back}>
        Back / Wishlist
      </Link>
    <div className='row  pt-5 g-5 ps-5'>
    {items.map((item) =>{
      return <>
      <div className='col-md-4'>
      <Card className='card'>
      <ImageWishList src={`/${item.image}`} alt="wishListImg" />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title text-center py-3">{item.name}</h5>
        <p className="card-text text-center">{item.description}</p>
  
        <div className='d-flex justify-content-center align-items-center'> 
        <ButtonIconWishList onClick={()=>handleDelete(item)}><FontAwesomeIcon icon={faTrashAlt} fontSize={'25px'}  color='#FC4059'/></ButtonIconWishList>
        <Link to={`/productDetails/${item.id}`} className='w-25'><FontAwesomeIcon icon={faShoppingBasket} fontSize={'25px'} color='#FCDD06'/></Link>
        </div>
      </div>
    </Card>
    </div>
      </>
    })}
    
    </div>


    </div>
  )
}

export default WishList
