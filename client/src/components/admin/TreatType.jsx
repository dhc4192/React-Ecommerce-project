import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createTreatType,
  getTreatTypes,
  deleteTreatType,
} from "../../services/treat_type";
import AdminNav from "../nav/AdminNav";

export default function TreatType() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [treatTypes, setTreatTypes] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadTreatTypes();
  }, []);

  const loadTreatTypes = () =>
    getTreatTypes().then((treat_type) => setTreatTypes(treat_type.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createTreatType({ name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadTreatTypes();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteTreatType(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadTreatTypes();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchName(e.target.value.toLowerCase());
  };

  const searched = (searchName) => (treat_type) =>
    treat_type.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Add Treat Type</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Treat Type"
            autoFocus
            required
          />
          <button type="submit">Save</button>
        </form>
        <input
          type="search"
          placeholder="Search"
          value={searchName}
          onChange={handleSearch}
        />
        <hr />
        {treatTypes.filter(searched(searchName)).map((treatType) => (
          <div key={treatType._id}>
            {treatType.name}
            <span onClick={() => handleRemove(treatType.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/treat_type/${treatType.slug}`}>
              <span>
                <EditOutlined />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
