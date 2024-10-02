import React, { useEffect, useState } from "react";
import { getProducts } from "../../common/function/GetRequest";
import { Link } from "react-router-dom";
import BottomCard from "../../common/design/BottomCard";
import StarRatings from "react-star-ratings";
import { AfterSale, Badge, Price, ProductCard } from "../../common/styled_comp/divStyles.style";
import { ProductImg } from "../../common/styled_comp/Image.style";
 
function Cards({ number }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // images display in pages
  const itemsPerPage = 3;
  const pageNumber = number;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
 

  useEffect(() => {
 
     getProducts(setProducts,setError,setLoading);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories!</p>;
  if (!products || products.length === 0) return <p>No products available.</p>;

  return (
    <div className="row">


      {products?.slice(startIndex, endIndex).map((product) => (
        <div className="col-md-4 col-xs-6 col-sm-6" key={product.id}>
          <ProductCard className='card'>

          
            <Link
              to={`/productDetails/${product.id}`}
            >
              <ProductImg
                src={`/${product.image}`}
                alt={product.name}
              />
            </Link>

           {product.discount > 0 ?  <Badge> <div> {product.discount}%</div></Badge> : ''}
            

            <div className="card-body d-flex flex-column justify-content-between">
             
            
            <h5 className='card-title  text-center'> {product.name} </h5>



              <div className="text-center mb-5"> 
                  
              <StarRatings
              rating={product.rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />

              </div>
              
              {product.discount > 0 ? 
                
                <div className="d-flex justify-content-center"> 
                
                <AfterSale> ${(product.price - (product.price * product.discount / 100)).toFixed(2)}</AfterSale>
                <Price style={{textDecoration:'line-through'}}> ${product.price }</Price>
                </div>
                :  
                <Price> $ {product.price}</Price>
              }
              
              
              
              <BottomCard product={product} selectedSize={product.sizes && product.sizes.length > 0 ? product.sizes[0] : null} />
              </div>
          </ProductCard>
        </div>
      ))}
    </div>
  );
}

export default Cards;