export const customStyles = {

    table: {
      style: {
        borderCollapse: 'collapse',  
        width: '80%',  
        margin: '20px auto'
      },
    },
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        '&' :{
 
          borderRadius: '10px',
          fontSize:'15px',
        },
        
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
         
        },
        '&:nth-of-type(even)': {
          backgroundColor: '#ffffff',
       
        },
      },
    },
  };