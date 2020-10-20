import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProductType, updateProductType } from "../../services/product_type";
import AdminNav from "../nav/AdminNav";

export default function ProductTypeUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadProductTypes();
  }, []);

  const loadProductTypes = () =>
    getProductType(match.params.slug).then((product_type) =>
      setName(product_type.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductType(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
        history.push("/admin/product_type");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Product Type</h4>
      <form onSubmit={handleSubmit}>
        <label>Product Type: </label>
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
