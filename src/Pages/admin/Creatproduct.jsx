import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProduct } from "../../state/productSlice";

function Creatproduct() {

    const [name, setProductName] = useState('');
    const [stock, setProductStock] = useState('');
    const [price, setProductPrice] = useState('');
    const [description, setProductDescription] = useState('');

    const dispatch = useDispatch();

    let handleSubmit = (e) =>{
      e.preventDefault();
      const id = Math.floor((Math.random()*500)).toString();

        dispatch(AddProduct({id, name, stock, price, description}))
    }
    
  return (
    <div className='mt-5 ms-5'>

    <form className='w-75 mx-auto mt-5 p-3'  onSubmit={handleSubmit}>
    
    <p className='my-3 pb-5 '> Create new Product</p> 

      <div className="d-flex justify-content-between mb-5">
        <div>
          <p htmlFor="Productname" className="form-label">Product Name</p>
          <input type="text" className="form-control" id="Productname" 
          value={name}
          onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <p htmlFor="Productstock" className="form-label">Count in Stock</p>
          <input type="number" className="form-control" id="Productstock"   
          value={stock}
          onChange={(e) => setProductStock(e.target.value)}/>
        </div>

        <div>
        <p htmlFor="Productprice" className="form-label">Price</p>
        <input type="number" className="form-control" id="Productprice"
        value={price}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>

      </div>



      

      <div className='mb-5'>
        <p htmlFor="Productdes" className="form-label">Product Description</p>
        <textarea className="form-control" id="Productdes" 
        value={description}
        onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>

    <div className='d-flex justify-content-center'>
    <button type="submit"  className="btn btn-primary w-50 text-center border-0 text-dark" style={{backgroundColor:'#FCDD06'}}> <p> Submit </p> </button>

    </div>
      
       
    </form>
  </div>
  )
}

export default Creatproduct
