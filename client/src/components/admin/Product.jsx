import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, createProduct } from "../../services/product";
import { getCategories, getSubCategories } from "../../services/category";
import { Select } from "antd";

const { Option } = Select;

export default function Product() {
  const { user } = useSelector((state) => ({ ...state }));
  const [subCatOptions, setSubCatOptions] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);

  const [values, setValues] = useState({
    title: "",
    description: "",
    nutrition: "",
    food_type: "",
    treat_type: "",
    supply_type: "",
    price: "",
    size: '',
    shipping: "",
    quantity: "",
    brand: "",
    category: "",
    images: [],
    categories: [],
    subcategories: [],
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) =>
      setValues({ ...values, categories: category.data })
    );

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

  return (
    <div>
      <AdminNav />
      <h4>Create Product</h4>
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
          type="text"
          name="brand"
          value={values.brand}
          placeholder="Brand"
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_type"
          value={values.product_type}
          placeholder="Product Type"
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
        <select name="food" onChange={handleChange}>
          <option>Please select</option>
          {values.food_type.length > 0 &&
            values.food_type.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
        </select>


        <label>Shipping: </label>
        <select name="shipping" onChange={handleChange}>
          <option>Please select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>Category: </label>
        <select name="category" onChange={handleCategoryChange}>
          <option>Please select</option>
          {values.categories.length > 0 &&
            values.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {showSubcategory && (
          <div>
            <label>Sub-Categories: </label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
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
