import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTreatType, updateTreatType } from "../../services/treat_type";
import AdminNav from "../nav/AdminNav";

export default function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  useEffect(() => {
    loadTreatType();
  }, []);

  const loadTreatType = () =>
    getTreatType(match.params.slug).then((treat_type) =>
      setName(treat_type.data.name)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTreatType(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" has been updated`);
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
        <label>Treat Type: </label>
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
