import React from 'react'
import CategoriesPage from './CategoriesPage'
import Products from './products/Products'
import TopRate from './TopRate'

const MainPage = ({products,categories}) => {
  return (
    <>
    <CategoriesPage categories={categories} />
    <Products products={products} />
    <TopRate  products={products} />
    </>
 
  )
}

export default MainPage
