import {createSlice, createAsyncThunk, } from '@reduxjs/toolkit'

const initialState = { products: [], product: null, 
    loading: false, error: null };

 // fetch Products  
export const fetchProducts  = createAsyncThunk(
    "products/fetchProducts", 
    async (_, thunkAPI) => { 
      
      const { rejectWithValue } = thunkAPI;
  
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json(); 
        return data; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


//fetch  product
export const fetchProduct  = createAsyncThunk(
  "products/fetchProduct", 
  async (id, thunkAPI) => { 
    
    const { rejectWithValue } = thunkAPI;

    try {
     
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluNDJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mjk2MTMyNTksImV4cCI6MTcyOTYxNjg1OSwic3ViIjoiNSJ9.NVizFDNjmpRPbiztKzKdCFFNkJvfrhuydPNG6FN0KQI', 
          'Content-Type': 'application/json',
        },
      });
   
       const data = await res.json(); 
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//edit product
export const editProduct  = createAsyncThunk(
  "products/editProduct", 
  async (item, thunkAPI) => { 
    
    const { rejectWithValue } = thunkAPI;

    try {

      const res = await fetch(`http://localhost:3000/products/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluNDJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mjk0MzAzODgsImV4cCI6MTcyOTQzMzk4OCwic3ViIjoiNSJ9.pi7wADC91TMX609TdfNtxDVs5ZI0MUSl5f2Ngp2kGPg', 
          'Content-Type': 'application/json',
        },
      });
   
       const data = await res.json(); 
       console.log(data)
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//add product 
export const AddProduct = createAsyncThunk('products/addProduct', async(item,thunkAPI)=>{
  const { rejectWithValue } = thunkAPI;

  try {

    const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluNDJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mjk0MzAzODgsImV4cCI6MTcyOTQzMzk4OCwic3ViIjoiNSJ9.pi7wADC91TMX609TdfNtxDVs5ZI0MUSl5f2Ngp2kGPg', 
        'Content-Type': 'application/json',
      },
    });
 
     const data = await res.json(); 

    return data; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
})


//delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async(id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
 
  try {
     await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluNDJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkzNTAxNzksImV4cCI6MTcyOTM1Mzc3OSwic3ViIjoiNSJ9.nhyFIGChtrJ_QsZF6_grvVNSY85Gsj_D96WwWUmbMJg',  
        'Content-Type': 'application/json',
      },
    });

  

    return id;
  }
  catch(error) {
    return rejectWithValue(error.message);
  }
})

 


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {  
    },
  
    extraReducers: (builder) => {
      builder
  
      //fetch products
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products= action.payload;  
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        //delete products
        .addCase(deleteProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products= state.products.filter((item) => item.id !== action.payload)
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
 

        //get product
        .addCase(fetchProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.product= action.payload;  
        })
        .addCase(fetchProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })


        //edit product
        .addCase(editProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
          state.loading = false;  
          state.product  = action.payload;

    
        })
        .addCase(editProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        //insert product
        
        .addCase(AddProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(AddProduct.fulfilled, (state, action) => {
          state.loading = false;  
          state.products.push(action.payload);
        })
        .addCase(AddProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });

    },

  });
  
 
  
  export default productSlice.reducer;
     