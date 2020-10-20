import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createProductCategory,
  getProductCategories,
  deleteProductCategory,
} from "../../services/product_category";
import AdminNav from "../nav/AdminNav";

export default function ProductCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProductCategories();
  }, []);

  const loadProductCategories = () =>
    getProductCategories().then((product_category) =>
      setProductCategories(product_category.data)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    createProductCategory({ name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadProductCategories();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteProductCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadProductCategories();
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

  const searched = (searchName) => (product_category) =>
    product_category.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Product Category</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Product Category"
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
        {productCategories.filter(searched(searchName)).map((product_category) => (
          <div key={product_category._id}>
            {product_category.name}
            <span onClick={() => handleRemove(product_category.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/product_category/${product_category.slug}`}>
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
