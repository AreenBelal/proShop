import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { getCategories } from '../common/function/GetRequest';
import axios from 'axios';
import { TitleTablePage } from '../common/styled_comp/divStyles.style';
import { InputCreatePro } from '../common/styled_comp/Input.style';

function CreateNewProduct() {

  const [cat, setCat] = useState([]);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true);
  const [name, setProductName] = useState('');
  const [stock, setProductStock] = useState('');
  const [price, setProductPrice] = useState('');
  const [category, setProductCategory] = useState(null);
  const [description, setProductDescription] = useState('');


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        getCategories(setCat,setError)
      } catch (error) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    getData();

  }, []);




  const createnewProduct = async (e) => {
    e.preventDefault();  
    try {
      await axios.post('http://localhost:8000/products', {
        name,
        stock,
        price,
        category: category ? category.value : '',
        description,
      });
  
 
      setProductName('');
      setProductStock('');
      setProductPrice('');
      setProductCategory(null);
      setProductDescription('');
      
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

   const options = cat.map(item => ({ value: item.name, label: item.name }));

  return (
    <div className='mt-5 ms-5'>

      <form className='w-75 mx-auto mt-5 p-3' onSubmit={createnewProduct}>
      
      <TitleTablePage className='my-3 pb-5 '> Create new Product</TitleTablePage> 

        <div className="d-flex justify-content-between mb-5">
          <div>
            <InputCreatePro htmlFor="Productname" className="form-label">Product Name</InputCreatePro>
            <input type="text" className="form-control" id="Productname" 
            value={name}
            onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <InputCreatePro htmlFor="Productstock" className="form-label">Count in Stock</InputCreatePro>
            <input type="number" className="form-control" id="Productstock"   
            value={stock}
            onChange={(e) => setProductStock(e.target.value)}/>
          </div>

          <div>
          <InputCreatePro htmlFor="Productprice" className="form-label">Price</InputCreatePro>
          <input type="number" className="form-control" id="Productprice"
          value={price}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        </div>

 

        <div className='w-100 mb-5'>
          <InputCreatePro htmlFor="Productcategory" className="form-label">Product Category</InputCreatePro>
          <Select
            id="Productcategory"
            options={options}
            placeholder="Choose Category"
            value={category}
            onChange={setProductCategory}
          />
        </div>

        <div className='mb-5'>
          <InputCreatePro htmlFor="Productdes" className="form-label">Product Description</InputCreatePro>
          <textarea className="form-control" id="Productdes" 
          value={description}
          onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

      <div className='d-flex justify-content-center'>
      <button type="submit"  className="btn btn-primary w-50 text-center border-0 text-dark" style={{backgroundColor:'#FCDD06'}}> <InputCreatePro> Submit </InputCreatePro> </button>

      </div>
        
         
      </form>
    </div>
  )
}

export default CreateNewProduct;
