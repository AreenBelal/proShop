import React from 'react'
import { CardCategory } from './styled_component/div.style';
import { CardImg } from './styled_component/image.style';

const CategoryCard = ({categories, number}) => {

    const itemsPerPage = 4;
    const pageNumber =  number;
    const startIndex = (pageNumber) * itemsPerPage;   // 3*4 = 12
    const endIndex = startIndex + itemsPerPage;

  return (
    <div className='container'>
    <div className='row'>
      {categories?.slice(startIndex, endIndex).map((category) => (
        <div className='col-md-3 col-xs-6 col-sm-6'  key={category.id}>
          <CardCategory className='card bg-transparent'>
            <CardImg
              src={`/${category.image}`}
              className='card-img-top'
              alt={category.name || 'FallbackImage'}
            />
          </CardCategory>
          <h5 className='text-center pt-3'>{category.name}</h5>
        </div>
      ))}
    </div>
    </div>
  )
}

export default CategoryCard