import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../services/category";
import { getSubCategory, updateSubCategory } from "../../services/subcategory";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryRef, setCategoryRef] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadSubCategory = () =>
    getSubCategory(match.params.slug).then((subcategory) => {
      setName(subcategory.data.name);
      setCategoryRef(subcategory.data.categoryRef);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubCategory(match.params.slug, { name, categoryRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/subcategory");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Sub-Category</h4>
      <label>Category: </label>
      <select name="category" onChange={(e) => setCategoryRef(e.target.value)}>
        {categories.length > 0 &&
          categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
              selected={category._id === categoryRef}
            >
              {category.name}
            </option>
          ))}
      </select>
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
    </div>
  );
};

export default SubUpdate;
