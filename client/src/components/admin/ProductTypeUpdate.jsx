import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProductCategories } from "../../services/product_category";
import { getProductType, updateProductType } from "../../services/product_type";

export default function ProductTypeUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [productCategoryRef, setProductCategoryRef] = useState("");

  useEffect(() => {
    loadProductCategories();
    loadProductTypes();
  }, []);

  const loadProductCategories = () =>
  getProductCategories().then((product_category) => setProductCategories(product_category.data));


  const loadProductTypes = () =>
    getProductType(match.params.slug).then((product_type) => {
      setName(product_type.data.name);
      setProductCategoryRef(product_type.data.productCategoryRef);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductType(
      match.params.slug,
      { name, productCategoryRef },
      user.token
    )
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is updated`);
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
      <label>Product Category: </label>
      <select name="product_category" onChange={(e) => setProductCategoryRef(e.target.value)}>
        {productCategories.length > 0 &&
          productCategories.map((product_category) => (
            <option
              key={product_category._id}
              value={product_category._id}
              selected={product_category._id === productCategoryRef}
            >
              {product_category.name}
            </option>
          ))}
      </select>
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
    </div>
  );
}
