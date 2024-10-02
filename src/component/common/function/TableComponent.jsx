import DataTable from 'react-data-table-component';
import {customStyles} from './StyleTable.js'
function TableComponent({ productDetails }) {
 
  const data = [
    { property: 'Price', value: productDetails.price },
    { property: 'Rating', value: productDetails.rating },
    { property: 'Category', value: productDetails.category },
    { property: 'Description', value: productDetails.description },
  ];

  const columns = [
    {
      name: 'Property',
      selector: row => row.property,
      sortable: true,
    },
    {
      name: 'Value',
      selector: row => row.value,
      sortable: true,
      wrap: true,
    },
  ];

  

  return <DataTable columns={columns} data={data}  customStyles={customStyles}/>;
}

export default TableComponent;
