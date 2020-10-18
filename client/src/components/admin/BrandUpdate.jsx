import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getBrand, updateBrand } from "../../services/brand";
import AdminNav from "../nav/AdminNav";

export default function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = () =>
    getBrand(match.params.slug).then((brand) =>
      setName(brand.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBrand(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
        history.push("/admin/brand");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Brand</h4>
      <form onSubmit={handleSubmit}>
        <label>Brand: </label>
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
