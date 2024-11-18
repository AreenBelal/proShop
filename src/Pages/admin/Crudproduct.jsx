import React from 'react'
import DataTable from 'react-data-table-component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {customStyles} from '../../component/styleTable';

function Crudproduct({products , deleteRecord}) {
  
    const navigate = useNavigate();
  
      // array of products
      const data = products.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
      }));
  
      let handleEdit = (id) =>{
         navigate(`/products/${id}/edit`);
      }
  
    
  
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
                <button typeof='button' onClick={(e) => handleEdit(row.id)} title="Edit" className='me-3 bg-transparent border-0'>
                  <FontAwesomeIcon icon={faEdit} className='fs-5'/>
                </button>
                <button typeof='button' onClick={(e) => deleteRecord(row.id, e)} title="Delete" className='bg-transparent border-0'>
                  <FontAwesomeIcon icon={faTrash}  className='fs-5' style={{color:'red'}} />
                </button>
              </div>
            ),
            ignoreRowClick: true,
            button: true,
          },
      ];
  
  
      
  
  
    return (
      <div>
           <DataTable  customStyles={customStyles} columns={columns} data={data}   pagination  paginationPerPage={5}    paginationRowsPerPageOptions={[5, 10, 15]}  />
      </div>
    )
  }
  
  export default Crudproduct
  
