import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../../services/category";
import AdminNav from "../nav/AdminNav";
import Search from "../forms/Search";

export default function Category() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
        });
    }
  };

  const searched = (searchName) => (category) =>
    category.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Create category</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Category"
            autoFocus
            required
          />
          <button type="submit">Save</button>
        </form>
        <Search searchName={searchName} setSearchName={setSearchName} />
        <hr />
        {categories.filter(searched(searchName)).map((category) => (
          <div key={category._id}>
            {category.name}
            <span onClick={() => handleRemove(category.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/category/${category.slug}`}>
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
