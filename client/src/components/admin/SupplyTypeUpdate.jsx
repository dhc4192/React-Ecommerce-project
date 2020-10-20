import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSupplyType, updateSupplyType } from "../../services/supply_type";

export default function SupplyTypeUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productTypeRef, setProductTypeRef] = useState("");

  useEffect(() => {
    loadSupplyTypes();
  }, []);

  const loadSupplyTypes = () =>
    getSupplyType(match.params.slug).then((supply_type) => {
      setName(supply_type.data.name);
      setProductTypeRef(supply_type.data.productTypeRef);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSupplyType(match.params.slug, { name, productTypeRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is updated`);
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
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
