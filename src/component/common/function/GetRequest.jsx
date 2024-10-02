import axios from "axios";



export const getCategories = async (setCategories,setError) => {
    try {
      const res = await axios.get('http://localhost:8000/categories');
      setCategories(res.data);
    } catch (error) {
      setError(error);
    }
  };


  export const getProducts = async (setProducts,setError,setLoading) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/products");
      setProducts(res.data);
    } catch (error) {
      setError(error);
    }finally {
      setLoading(false);
    }
  };

  export const deleteProduct = async (productid,setError,setLoading) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/products/${productid}`);
    } catch (error) {
      setError(error);
    }finally {
      setLoading(false);
    }
  };