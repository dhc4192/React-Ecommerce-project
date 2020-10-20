import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getProductTypes } from "../../services/product_type";
import {
  createFoodType,
  getFoodTypes,
  deleteFoodType,
} from "../../services/food_type";
import AdminNav from "../nav/AdminNav";

export default function FoodType() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [foodTypes, setFoodTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeRef, setProductTypeRef] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProductTypes();
    loadFoodTypes();
  }, []);

  const loadProductTypes = () =>
    getProductTypes().then((productTypeRef) =>
      setProductTypes(productTypeRef.data)
    );

  const loadFoodTypes = () =>
    getFoodTypes().then((foodType) => setFoodTypes(foodType.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createFoodType({ name, productTypeRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadFoodTypes();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteFoodType(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadFoodTypes();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchName(e.target.value.toLowerCase());
  };

  const searched = (searchName) => (foodType) =>
    foodType.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Add Food Type</h4>
        <div>
          <label>Product Type: </label>
          <select onChange={(e) => setProductTypeRef(e.target.value)}>
            <option>Please Select</option>
            {productTypes.length > 0 &&
              productTypes.map((product_type) => (
                <option key={product_type._id} value={product_type._id}>
                  {product_type.name}
                </option>
              ))}
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Food Type"
            autoFocus
            required
          />
          <button type="submit">Save</button>
        </form>
        <input
          type="search"
          placeholder="Search"
          value={searchName}
          onChange={handleSearch}
        />
        <hr />
        {foodTypes.filter(searched(searchName)).map((foodType) => (
          <div key={foodType._id}>
            {foodType.name}
            <span onClick={() => handleRemove(foodType.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/food_type/${foodType.slug}`}>
              <span>
                <EditOutlined />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
