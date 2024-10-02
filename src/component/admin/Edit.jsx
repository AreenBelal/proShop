import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getProducts } from "../common/function/GetRequest";
import ReactSelect from "react-select";
import { TitleTablePage } from "../common/styled_comp/divStyles.style";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState(null);
  const [cat, setCat] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();


  useEffect(() => {
    getCategories(setCat, setError);
    axios({
      method: "get",
      url: `http://localhost:8000/products/${id}`,
    }).then((response) => {
      const product = response.data;
      setProductName(product?.name);
      setProductPrice(product?.price);
      setProductCategory(product?.productCategory);
    });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();

    axios({
      method: "put",
      url: `http://localhost:8000/products/${id}`,
      data: {
        name: productName,
        category: productCategory,
        price: productPrice,
      },
    });

    setTimeout(() =>{
    navigate('/producttable')
        
    },2000);
  };

  return (
    <>
      <TitleTablePage className="m-4 pt-5 ps-5"> Edit Product</TitleTablePage>

      <body className="d-flex justify-content-center align-items-center">
        <form
          className="w-50 h-50 p-5 bg-dark text-light"
          onSubmit={handleEdit}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <label htmlFor="ProductName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="ProductName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ProductPrice" className="form-label">
                Price
              </label>
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
            <label htmlFor="ProductCategory" className="form-label">
              Product Category
            </label>

            <ReactSelect
              id="ProductCategory"
              options={cat.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
              value={productCategory?.name}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "white",
                  color: "black",
                  border: state.isFocused ? "rgb(252, 221, 6)" : "black",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "rgb(0,0,0,0.7)",
                  color: "black",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? "rgb(252, 221, 6)"
                    : "rgb(0,0,0,0.7)",
                  color: state.isFocused ? "black" : "white",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "black",
                }),
              }}
              onChange={(selectedOption) => {
                setProductCategory(selectedOption.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-between mt-auto">
            <button
              type="submit"
              className="btn w-50 border-0 fs-6 p-2 text-dark fw-bolder"
              style={{ backgroundColor: "#FCDD06" }}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-danger fs-6 fw-bolder p-2 "
            >
              {" "}
              cancel{" "}
            </button>
          </div>
        </form>
      </body>
    </>
  );
};

export default Edit;
