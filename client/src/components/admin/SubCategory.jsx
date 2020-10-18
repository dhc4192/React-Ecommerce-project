import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategories } from "../../services/category";
import {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
} from "../../services/subcategory";
import AdminNav from "../nav/AdminNav";

export default function SubCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryRef, setCategoryRef] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((categoryRef) => setCategories(categoryRef.data));

  const loadSubCategories = () =>
    getSubCategories().then((subCategory) =>
      setSubCategories(subCategory.data)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    createSubCategory({ name, categoryRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteSubCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadSubCategories();
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

  const searched = (searchName) => (subCategory) =>
    subCategory.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Create Sub-Category</h4>
        <div>
          <label>Category: </label>
          <select onChange={(e) => setCategoryRef(e.target.value)}>
            <option>Please Select</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Sub-Category"
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
        {subCategories.filter(searched(searchName)).map((subCategory) => (
          <div key={subCategory._id}>
            {subCategory.name}
            <span onClick={() => handleRemove(subCategory.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/subcategory/${subCategory.slug}`}>
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
