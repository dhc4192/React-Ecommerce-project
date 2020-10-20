import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProductCategory, updateProductCategory } from "../../services/product_category";
import AdminNav from "../nav/AdminNav";

export default function ProductCategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadProductCategory();
  }, []);

  const loadProductCategory = () =>
    getProductCategory(match.params.slug).then((product_category) =>
      setName(product_category.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
        history.push("/admin/product_category");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Product Category</h4>
      <form onSubmit={handleSubmit}>
        <label>Product Category: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button>Save</button>
      </form>
    </div>
  );
}
