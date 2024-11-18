import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-router-dom';
import { SearchContainer } from '../styled_component/div.style';
import { InputSearch } from '../styled_component/input.style';
import Icons from './Icons';

const Navbar = ({products}) => {
 
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
   
  
    let handleSearch = ()=>{
      let result = products.filter((product)=> product.name.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredProducts(result);
    }
     
  
  
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid d-flex w-100 me-3 pt-2'>
        
      
      <Link className={`navbar-brand d-flex fs-1 ${styles.proshop}`} to="/">
          <div style={{ color: "#FCDD06" }}>Pro</div>
          <div style={{ color: "#FFFFFF" }}>Shop</div>
        </Link>
  
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
        <div className={`input-group d-flex my-4 ${styles.search} mx-auto`}>
         
          <InputSearch
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}
        />
        
            <SearchContainer>
  
              <FontAwesomeIcon icon={faSearch} className="icon" />
  
              <button
                className="btn"
                type="button" 
                id="dropdownMenu2" 
                data-bs-toggle="dropdown"
                 aria-expanded="false" 
                 onClick={handleSearch}
                 >
                Search
              </button>
  
                    <ul className="dropdown-menu w-100 p-3 m-0 bg-body" aria-labelledby="dropdownMenu2">
                     {filteredProducts.map((item, index)=> <>
                        <Link to='' >
                     <li key={index}>
                    <button className="dropdown-item text-dark " type="button">
                      {item.name}
                    </button> </li> 
                    </Link>
                      </>
                     )}
                   
                    </ul>
            </SearchContainer>
          </div>
  
  
         
     
        </div>
  
      <Icons/>

      </div>
    </nav>
    )
  }
  
  export default Navbar
  