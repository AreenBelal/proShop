import { faBookmark, faUser, faToggleOff,  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css";
import { ThemeContext } from "../context/ThemeContext";

const Icons = () => {

    const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);  
    const { user , isAuthenticated } = useSelector((state) => state.auth);
    const { carts } = useSelector((state) => state.cart);
    

    const { wishlist } = useSelector((state) => state.wishlist);
    const userWishList = wishlist?.[1] || [];  
  
    
  
    const userCarts = carts?.user?.id|| [];  
  
    return (
      <>
        <div className="d-flex ms-auto justify-content-evenly align-items-center">
  
          <Link
            className="btn btn-dark d-flex flex-column justify-content-between align-items-center "
            to="/login"
          >
  
            <FontAwesomeIcon icon={faUser} className="fs-5" />
  
            {!isAuthenticated ? (
              <div className={styles.names}>Login / Sign up</div>
            ):
            (
               user && user.role === 'admin' ?    <div className={styles.names}>Admin</div> :
               <div className={styles.names}>{ user?.email?.substring(0, user.email.indexOf('@'))}</div>
            )         
            }
  
          </Link>
   
          <Link
            className="btn btn-dark d-flex flex-column justify-content-between align-items-center "
            to="/wishlist"
          >
            <div className="position-relative">
              <FontAwesomeIcon icon={faBookmark} className="fs-5" />
              <span className={styles.badgeCircle}>{userWishList.length}</span>
            </div>
            <div className={styles.names}>WishList</div>
          </Link>
  
          <Link
            className="btn btn-dark d-flex flex-column justify-content-between align-items-center "
            to="/cart"
          >
            <div className="position-relative">
              <FontAwesomeIcon icon={faCartShopping} className="fs-5" />
              <span className={styles.badgeCircle}>{userCarts.length}</span>
            </div>
            <div className={styles.names}>Cart</div>
          </Link>
        </div>
  
        <button onClick={toggleDarkMode}   className="btn btn-dark d-flex flex-column justify-content-between align-items-center ">
        <FontAwesomeIcon icon={faToggleOff} flip="both" style={{color: "#FFD43B",}} className="fs-5" />
           </button> 
      </>
    );
  };
  
  export default Icons;
  