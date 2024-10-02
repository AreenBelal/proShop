import React , {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./navbar.module.css";
import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';  
 
function ListOfIcons({isLoggedIn}) {
  const [name, setName] = useState('');
  const [userID, setUserID] = useState('');
  const [role, setRole] = useState(''); 

  const cart = useSelector((state) => state.Ecommerce.cart);
  const wishlist = useSelector((state) => state.Ecommerce.wishlist);

  useEffect(() => {
  
    const token = localStorage.getItem("token");
     if (token) {
      try {
        const decodedToken = jwtDecode(token);
   
        setUserID(decodedToken.id || '')
        setName(decodedToken.name || '');  
         setRole(decodedToken.role || '');
      } catch (error) {
       
        console.error('Failed to decode token:', error);
      }
    }
  }, [isLoggedIn,role ]);  


  return (
    <div>
    <div className={`${styles.buttons} d-flex ms-auto`}>
        
            
    {!isLoggedIn ? (
       <Link className={`btn btn-dark ${styles.oneButton}`} to='/login'>
         <FontAwesomeIcon
           icon={faUser}
           style={{ fontSize: '20px' }}
         />
         <div className={styles.names}>Login / Sign up</div>
       </Link>
     ) : (

        role  === 'admin' ? (
        
        <Link className={`btn btn-dark ${styles.oneButton}`} to='/admin'>
        <FontAwesomeIcon
          icon={faUser}
          className={styles.AwesomeIcon}
        />
        <div className={styles.names}> admin </div>
      </Link> 
        
      ): (
         <Link className={`btn btn-dark ${styles.oneButton}`} to={`/profile/${userID}`}>
         <FontAwesomeIcon
           icon={faUser}
           className={styles.AwesomeIcon}
         />
         <div className={styles.names}> {name} </div>
       </Link> 

     )
    
     
     )
     }

     <Link className={`btn btn-dark ${styles.oneButton}`} to='/wishlist'>
     <div className='position-relative'>
         <FontAwesomeIcon
           icon={faBookmark}
           className={styles.AwesomeIcon}

         />
         <span className={styles.badgeCircle}>{wishlist?.length ||0}</span>
       </div>
       <div className={styles.names}>WishList</div>
     </Link>

     <Link type="button" className={`btn btn-dark ${styles.oneButton}`} to='/cart'>
       <div className='position-relative'>
         <FontAwesomeIcon
           icon={faCartShopping}
            className={styles.AwesomeIcon}
         />
         <span className={styles.badgeCircle}>{cart?.length || 0}</span>
       </div>
       <div className={`${styles.names}`}>Cart</div>
     </Link>


   </div>
    </div>
  )
}

export default ListOfIcons
