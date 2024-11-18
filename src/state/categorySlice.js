import {createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
const initialState = { categories: [], category: null,  loading: false, error: null };


// fetch categories 
export const fetchCategories  = createAsyncThunk(
    "categories/fetchCategories", 
    async (_, thunkAPI) => { 
      
      const { rejectWithValue } = thunkAPI;
  
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json(); 
        return data; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

//fetch category
export const fetchCategory  = createAsyncThunk(
    "categories/fetchCategory", 
    async (id, thunkAPI) => { 
      
      const { rejectWithValue } = thunkAPI;
  
      try {
       
        const res = await fetch(`http://localhost:3000/categories/${id}`, {
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


  //edit category
export const editCategory  = createAsyncThunk(
    "categories/editCategory", 
    async (item, thunkAPI) => { 
      
      const { rejectWithValue } = thunkAPI;
  
      try {
  
        const res = await fetch(`http://localhost:3000/categories/${item.id}`, {
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


  //add category 
export const AddCategory  = createAsyncThunk('categories/AddCategory', async(item,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
  
    try {
  
      const res = await fetch('http://localhost:3000/categories', {
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

  //delete category
export const deleteCategory  = createAsyncThunk('categories/deleteCategory', async(id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
   
    try {
       await fetch(`http://localhost:3000/categories/${id}`, {
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
  
  export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {  
    },
  
    extraReducers: (builder) => {
      builder
  
   
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories= action.payload;  
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

   
        .addCase(deleteCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.categories= state.categories.filter((item) => item.id !== action.payload)
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
 

     
        .addCase(fetchCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.category= action.payload;  
        })
        .addCase(fetchCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })


  
        .addCase(editCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editCategory.fulfilled, (state, action) => {
          state.loading = false;  
          state.category  = action.payload;

    
        })
        .addCase(editCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

   
        
        .addCase(AddCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(AddCategory.fulfilled, (state, action) => {
          state.loading = false;  
          state.categories.push(action.payload);
        })
        .addCase(AddCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });

    },

  });
  

  export default categorySlice.reducer;
