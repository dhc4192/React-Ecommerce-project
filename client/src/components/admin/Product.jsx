import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../services/product";
import { getCategories, getSubCategories } from "../../services/category";
import {
  getProductCategories,
  getProductTypes,
} from "../../services/product_category";
import { Select } from "antd";

const { Option } = Select;

export default function Product() {
  const { user } = useSelector((state) => ({ ...state }));
  const [subCatOptions, setSubCatOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [showProductType, setShowProductType] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
    nutrition: "",
    price: "",
    size: "",
    shipping: "",
    quantity: "",
    category: "",
    product_types: [],
    images: [],
    subcategories: [],
  });

  useEffect(() => {
    const apiCall = async () => {
      const categoryData = await getCategories();
      const productCategoryData = await getProductCategories();
      setCategories(categoryData.data);
      setProductCategories(productCategoryData.data);
    };
    apiCall();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`"${res.data.title}" has been added!`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [], category: e.target.value });
    getSubCategories(e.target.value).then((res) => {
      setSubCatOptions(res.data);
    });
    setShowSubcategory(true);
  };
  const handleProductCategoryChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      product_types: [],
      product_category: e.target.value,
    });
    getProductTypes(e.target.value).then((res) => {
      setProductTypeOptions(res.data);
    });
    setShowProductType(true);
  };

  return (
    <div>
      <AdminNav />
      <h4>Add Product</h4>
      <hr />
      <label>Name: </label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder="Name"
          onChange={handleChange}
        />
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={values.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <label>Size: </label>
        <input
          type="text"
          name="size"
          value={values.size}
          placeholder="Size"
          onChange={handleChange}
        />
        <label>Quantity: </label>
        <input
          type="number"
          name="quantity"
          value={values.quantity}
          placeholder="Quantity"
          onChange={handleChange}
        />
        <label>Description: </label>
        <textarea
          type="text"
          cols="20"
          rows="5"
          name="description"
          value={values.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <label>Nutrition: </label>
        <textarea
          type="text"
          cols="20"
          rows="5"
          name="nutrition"
          value={values.nutrition}
          placeholder="Nutrition"
          onChange={handleChange}
        />
        <label>Shipping: </label>
        <select name="shipping" onChange={handleChange}>
          <option>Please select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <hr />
        <label>Product Category: </label>
        <select name="product_category" onChange={handleProductCategoryChange}>
          <option>--Please select--</option>
          {productCategories.map((product_category) => (
            <option key={product_category._id} value={product_category._id}>
              {product_category.name}
            </option>
          ))}
        </select>
        <div>
          <label>Product Type: </label>
          <Select
            style={{ width: "300px" }}
            placeholder="---Please Select---"
            value={values.product_types}
            onChange={(value) => setValues({ ...values, product_types: value })}
          >
            {productTypeOptions.length &&
              productTypeOptions.map((product_type) => (
                <Option key={product_type._id} value={product_type._id}>
                  {product_type.name}
                </Option>
              ))}
          </Select>
        </div>
        <label>Pet Type: </label>
        <select name="category" onChange={handleCategoryChange}>
          <option>--Please select--</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {showSubcategory && (
          <div>
            <label>Pet Age: </label>
            <Select
              style={{ width: "300px" }}
              placeholder="---Please Select---"
              value={values.subcategories}
              onChange={(value) =>
                setValues({ ...values, subcategories: value })
              }
            >
              {subCatOptions.length &&
                subCatOptions.map((subcategory) => (
                  <Option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        <button>Save</button>
      </form>
    </div>
  );
}
