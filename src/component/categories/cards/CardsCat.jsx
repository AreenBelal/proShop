import React, { useEffect, useState } from 'react';
import {getCategories} from '../../common/function/GetRequest'
import { CategoryCard } from '../../common/styled_comp/divStyles.style';
import { CardImg } from '../../common/styled_comp/Image.style';

function CardsCat({ number }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;
  const pageNumber =  number;
  const startIndex = (pageNumber) * itemsPerPage;   // 3*4 = 12
  const endIndex = startIndex + itemsPerPage;


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await getCategories(setCategories,setError);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories!</p>;

  return (
    <div className='container'>
    <div className='row'>
      {categories?.slice(startIndex, endIndex).map((category) => (
        <div className='col-md-3 col-xs-6 col-sm-6' key={category.id}>
          <CategoryCard className='card'>
            <CardImg 
              src={category.image || '/images/soon.png'}
              className='card-img-top'
              alt={category.name || 'FallbackImage'}
            />
          </CategoryCard>
          <h5 className='text-center pt-3'>{category.name}</h5>
        </div>
      ))}
    </div>
    </div>
  );
}

export default CardsCat;
