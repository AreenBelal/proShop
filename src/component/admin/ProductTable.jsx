import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { deleteProduct, getCategories, getProducts } from '../common/function/GetRequest';
import { useNavigate } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {customStyles} from '../common/function/StyleTable.js'
import axios from 'axios';
import { CreateProudct } from '../common/styled_comp/Button.style';
import { TitleTablePage } from '../common/styled_comp/divStyles.style';
import EditModal from './EditModal.jsx';
import Swal from 'sweetalert2';
 

function ProductTable() {
    const [product, setProducts] = useState([]);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true);

 
   
  

    const navigate = useNavigate();

  


    useEffect(() => {
       getProducts(setProducts,setError,setLoading);
      }, []);




      
      let createProduct = (e) =>{
        e.preventDefault();
        navigate(`/addproduct`)
      }

      const handleDelete = async (id, e) => {      
        e.preventDefault();
    
        const result = await Swal.fire({
            title: 'Are You Sure to Delete Product?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        });
    
        if (result.isConfirmed) {
            try {
                setLoading(true);
                await deleteProduct(id, setError, setLoading);  
                await getProducts(setProducts, setError, setLoading);  
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    
      
      


      const handleEdit = (item,e) => {
        e.preventDefault();
  
        navigate(`/edit/${item}`)
      };
     
    

    const data = product.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
    }));
    
    
      const columns = [
        {
          name: 'product ID',
          selector: row => row.id,
          sortable: true,
        },
        {
          name: 'product name',
          selector: row => row.name,
          sortable: true,
        },
        {
            name: 'product price',
            selector: row => row.price,
            sortable: true,
          },
          {
            name: 'product category',
            selector: row => row.category,
            sortable: true,
          },
          {
            name: 'Actions',
            cell: row => (
              <div className='d-flex'>
                <button typeof='button' onClick={(e) => handleEdit(row.id, e)} title="Edit" className='me-3 bg-transparent border-0'>
                  <FontAwesomeIcon icon={faEdit} className='fs-5'/>
                </button>
                <button typeof='button' onClick={(e) => handleDelete(row.id, e)} title="Delete" className='bg-transparent border-0'>
                  <FontAwesomeIcon icon={faTrash}  className='fs-5' style={{color:'red'}} />
                </button>
              </div>
            ),
            ignoreRowClick: true,
            button: true,
          },
      ];

 
      return <div className='mx-5'>
      <div className='d-flex justify-content-between my-5'>
      <TitleTablePage>Products</TitleTablePage>
      <CreateProudct onClick={createProduct}> <p>Create Product</p></CreateProudct>
       
      </div>
      <DataTable columns={columns} data={data} customStyles={customStyles} pagination  paginationPerPage={5}    paginationRowsPerPageOptions={[5, 10, 15]}  />
       
      

 
      </div>
    

}

export default ProductTable
