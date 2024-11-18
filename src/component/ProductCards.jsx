import React from 'react'
import ProductCardDetails from './ProductCardDetails';

const ProductCards = ({ products, number }) => {
    const itemsPerPage = 3;
    const pageNumber = number;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    return (
      <div className="container">
        <div className="row">
          {products?.slice(startIndex, endIndex).map((product, index) => (
            <>
              <div className="col-md-4 col-xs-6 col-sm-6" key={index}>
              <ProductCardDetails product={product}/>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductCards;
  
