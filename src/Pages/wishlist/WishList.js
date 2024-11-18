import React from 'react'
import WishlistCard from '../../component/WishlistCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allWishlist } from '../../state/allwishSlice';

const WishList = () => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const userId = Object.keys(wishlist)[0]
    const userWishList =  Object.values(wishlist)[0]
    const dispatch = useDispatch();
 
  return (
    <div className="container mt-5">
    <div className='d-flex justify-content-between'>
    <Link to="/" className="btn btn-link text-decoration-none mb-1 fw-bolder text-dark" style={{backgroundColor:'#FCDD06'}}> 
    &larr; Back to Shopping
    </Link>

    <button  className="btn mb-1 fw-bolder text-light bg-danger" onClick={()=>{dispatch(allWishlist({userId}))}}> 
    Reset
    </button>

    </div>
 

    {userWishList?.length > 0 ? (

       <div className="row mt-5">
        {userWishList?.map((product) => (
          <div className="col-md-6" key={product.id}>
            <WishlistCard product={product} userId={userId}/>
          </div>
        ))}
        </div>
             
    ) :(
        <div className="text-center">
          <h5 className="text-muted">Your wishList is empty.</h5>
        </div>
      )
        }

  
  </div> 
      ) 
}

export default WishList
