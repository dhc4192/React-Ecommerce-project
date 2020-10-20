import React, { useState, useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTreatType, updateTreatType } from "../../services/treat_type";

export default function TreatTypeUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [productTypeRef, setProductTypeRef] = useState("");

  useEffect(() => {
    loadFoodTypes();
  }, []);

  const loadFoodTypes = () =>
    getTreatType(match.params.slug).then((treat_type) => {
      setName(treat_type.data.name);
      setProductTypeRef(treat_type.data.productTypeRef);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTreatType(match.params.slug, { name, productTypeRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/treat_type");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div>
      <AdminNav />
      <h4>Update Treat Type</h4>
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
