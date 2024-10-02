import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import BottomCard from "../common/design/BottomCard";
import { ProductImg } from "../common/styled_comp/Image.style";
import { Cardmain, CardTitle, Price, ProductCard } from "../common/styled_comp/divStyles.style";

function TopRate() {
  const [topRated, setTopRated] = useState([]);
 
  let getToprate = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      const products = res?.data;

      const TopRated = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      setTopRated(TopRated);
    } catch (error) {}
  };

  useEffect(() => {
    getToprate();
  }, []);

  return (
    <Cardmain>
      <CardTitle>TOP RATE PRODUCTS</CardTitle>

      <div className="container">
      
      <div className="row g-0 w-100 mb-2"  style={{border: '1px solid #FCDD06', borderRadius: '16px' }}>
      {topRated?.map((product,index) => {
        return (
          <div className="col-md-4 col-xs-6 col-sm-6" key={product.id}>
            <ProductCard className= {` card mx-auto border-0 ${index  === 0 ?  '': 'border-start'} `}>
            
            <Link
                to={`/productDetails/${product.id}`}
                className="position-relative mt-3"
              >
                <ProductImg
                  src={product.image}
                  style={{
                    display: 'block',
                    width: '80%',
                    margin: '0 auto'
                  }} 
                  alt={product.name}
                />
              </Link>

              <div className="card-body">
                <h5 className='card-title text-center'>
                  {product.name}
                </h5>

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
                

                <Price>${product.price}</Price>
              

                <BottomCard product={product} selectedSize={product.sizes && product.sizes.length > 0 ? product.sizes[0] : null} />


              </div>
            </ProductCard>
          </div>
        );
      })}
    </div>

      </div>
      
    </Cardmain>
  );
}

export default TopRate;
