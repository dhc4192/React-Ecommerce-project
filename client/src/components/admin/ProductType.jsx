import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getProductCategories } from "../../services/product_category";
import {
  createProductType,
  getProductTypes,
  deleteProductType,
} from "../../services/product_type";
import AdminNav from "../nav/AdminNav";

export default function ProductType() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productCategoryRef, setProductCategoryRef] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProductCategories();
    loadProductTypes();
  }, []);

  const loadProductCategories = () =>
    getProductCategories().then((productCategoryRef) =>
      setProductCategories(productCategoryRef.data)
    );

  const loadProductTypes = () =>
    getProductTypes().then((product_type) =>
      setProductTypes(product_type.data)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    createProductType({ name, productCategoryRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadProductTypes();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteProductType(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadProductTypes();
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

  const searched = (searchName) => (product_type) =>
    product_type.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Product Type</h4>
        <div>
          <label>Product Type: </label>
          <select onChange={(e) => setProductCategoryRef(e.target.value)}>
            <option>Please Select</option>
            {productCategories.length > 0 &&
              productCategories.map((product_type) => (
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
            placeholder="Product Type"
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
        {productTypes.filter(searched(searchName)).map((product_type) => (
          <div key={product_type._id}>
            {product_type.name}
            <span onClick={() => handleRemove(product_type.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/product_type/${product_type.slug}`}>
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
