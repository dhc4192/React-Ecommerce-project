import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSupplyType, updateSupplyType } from "../../services/supply_type";
import AdminNav from "../nav/AdminNav";

export default function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadSupplyType();
  }, []);

  const loadSupplyType = () =>
    getSupplyType(match.params.slug).then((supply_type) =>
      setName(supply_type.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSupplyType(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
        history.push("/admin/supply_type");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Supply Type</h4>
      <form onSubmit={handleSubmit}>
        <label>Supply Type: </label>
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
