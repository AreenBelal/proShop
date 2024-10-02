import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./navbar.module.css";
import ListOfIcons from "./ListOfIcons";
import { SearchButton } from '../common/styled_comp/Button.style';
import { SearchContainer } from "../common/styled_comp/divStyles.style";
import { InputSearch } from "../common/styled_comp/Input.style";
import { getProducts } from "../common/function/GetRequest";

function Navbar({ isLoggedIn }) {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [fillteredproducts, setFillteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   getProducts(setProducts,setError,setLoading);
  }, []);  

  const handleSearch = (text) => {
    // if no text in the input set empty array then return
    if (text.trim() === "") {
      setFillteredProducts([]);
      return;
    }

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFillteredProducts(filteredProducts);
  }
  
  

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid d-flex w-100 me-3 pt-2'>
        <Link className={`navbar-brand d-flex ${styles.proshop}`} to="/mainpage">
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
          <div className={`input-group ${styles.search} mx-auto`}>
          <InputSearch
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
            <SearchContainer>
              <FontAwesomeIcon icon={faSearch} className="icon" />
              <SearchButton
                className="btn"
                type="button" 
                id="dropdownMenu2" 
                data-bs-toggle="dropdown"
                 aria-expanded="false"
                onClick={() => handleSearch(searchText)}
              >
                Search
              </SearchButton>

         
                <ul className="dropdown-menu w-100 p-3 m-0 bg-body" aria-labelledby="dropdownMenu2">
                {fillteredproducts.map((item, index) => (
                  <Link to={`/productDetails/${item.id}`} style={{textDecoration:'none'}}
                  >
                   <li key={index}>
                  <button className="dropdown-item text-dark " type="button">
                    {item.name}
                  </button>
                </li> </Link>
                    
                  )).slice(0,3)}
                </ul>
          
              

            </SearchContainer>
          </div>

          <ListOfIcons isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
