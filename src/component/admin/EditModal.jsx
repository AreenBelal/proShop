import React, { useEffect, useState } from 'react'
import { getCategories } from '../common/function/GetRequest';
import Select from 'react-select';

function EditModal({setShowEditModal,handleEditForm, productName, setProductName, productPrice, setProductPrice , productCategory, setProductCategory}) {
  
    const [cat, setCat] = useState([]);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const getData = async () => {
          try {
            setLoading(true);
            await getCategories(setCat, setError);

          } catch (error) {
            // Handle the error if needed
          } finally {
            setLoading(false);
          }
        };
    
        getData();
      }, []);
  
    return (
    <div>
    <div className="modal my-5" tabIndex={-1} style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-2">
            <div className="modal-header">
                <h5 className="modal-title text-center">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)} aria-label="Close" />
            </div>
            <div className="modal-body">
                <form onSubmit={handleEditForm} className='p-2'>

                <div className='d-flex justify-content-between align-items-center mb-4'>
               
                <div>
                <label htmlFor="ProductName" className="form-label">Product Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="ProductName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="ProductPrice" className="form-label">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="ProductPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>
                </div>
           
                    <div className="mb-5 ">
                        <label htmlFor="ProductCategory" className="form-label">Product Category</label>
                        <Select
                            id="ProductCategory"
                            options={cat.map(item => ({ value: item.name, label: item.name }))}
                            placeholder="Choose Category"
                            value={productCategory}
                            onChange={setProductCategory}
                        />
                    </div>
                    <div className='d-flex justify-content-between'>
                    <button type="submit" className="btn  border-0 "  style={{backgroundColor:'#FCDD06'}} >Save changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>               
                    </div>
     
                    </form>
            </div>
          </div>
    </div>
</div>
    </div>
  )
}

export default EditModal
