import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getFoodType, updateFoodType } from "../../services/food_type";

export default function FoodTypeUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productTypeRef, setProductTypeRef] = useState("");

  useEffect(() => {
    loadFoodTypes();
  }, []);

  const loadFoodTypes = () =>
    getFoodType(match.params.slug).then((food_type) => {
      setName(food_type.data.name);
      setProductTypeRef(food_type.data.productTypeRef);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFoodType(match.params.slug, { name, productTypeRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/food_type");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Food Type</h4>
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
    </div>
  );
}
