import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../services/product";
import { getCategories, getSubCategories } from "../../services/category";
import { getProductTypes, getFoodTypes } from "../../services/product_type";
import { Select } from "antd";

const { Option } = Select;

export default function Product() {
  const { user } = useSelector((state) => ({ ...state }));
  const [subCatOptions, setSubCatOptions] = useState([]);
  const [foodTypeOptions, setFoodTypeOptions] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
    nutrition: "",
    price: "",
    size: "",
    shipping: "",
    quantity: "",
    category: "",
    treat_types: "",
    supply_types: "",
    images: [],
    food_types: "",
    subcategories: [],
  });

  useEffect(() => {
    const apiCall = async () => {
      // const foodTypeData = await getFoodTypes();
      // const treatTypeData = await getTreatTypes();
      // const supplyTypeData = await getSupplyTypes();
      const categoryData = await getCategories();
      const productTypeData = await getProductTypes();
      // setFoodTypes(foodTypeData.data);
      // setTreatTypes(treatTypeData.data);
      // setSupplyTypes(supplyTypeData.data);
      setCategories(categoryData.data);
      setProductTypes(productTypeData.data);
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
  const handleProductTypeChange = (e) => {
    e.preventDefault();
    setValues({ ...values, food_types: "", product_type: e.target.value });
    getFoodTypes(e.target.value).then((res) => {
      setFoodTypeOptions(res.data);
    });
    // setShowSubcategory(true);
  };

  return (
    <div>
      <AdminNav />
      <h4>Add Product</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={values.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          value={values.size}
          placeholder="Size"
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          value={values.quantity}
          placeholder="Quantity"
          onChange={handleChange}
        />
        <textarea
          type="text"
          cols="20"
          rows="5"
          name="description"
          value={values.description}
          placeholder="Description"
          onChange={handleChange}
        />
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

        <label>Product Type: </label>
        <select name="product_type" onChange={handleProductTypeChange}>
          {productTypes.map((product_type) => (
            <option key={product_type._id} value={product_type._id}>
              {product_type.name}
            </option>
          ))}
        </select>

        <label>Food Type: </label>
        <Select
          style={{ width: "200px" }}
          placeholder="Please Select"
          value={values.food_types}
          onChange={(value) => setValues({ ...values, food_types: value })}
        >
          {foodTypeOptions.map((food_type) => (
            <Option key={food_type._id} value={food_type._id}>
              {food_type.name}
            </Option>
          ))}
        </Select>

        <label>Pet Type: </label>
        <select name="category" onChange={handleCategoryChange}>
          <option>Please select</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {showSubcategory && (
          <div>
            <label>Product Type: </label>
            <Select
              style={{ width: "500px" }}
              placeholder="Select one or more"
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
