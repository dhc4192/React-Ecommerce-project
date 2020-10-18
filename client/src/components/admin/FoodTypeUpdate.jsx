import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getFoodType, updateFoodType } from "../../services/food_type";
import AdminNav from "../nav/AdminNav";

export default function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadFoodType();
  }, []);

  const loadFoodType = () =>
    getFoodType(match.params.slug).then((food_type) =>
      setName(food_type.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFoodType(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
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
        <label>Food Type: </label>
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
