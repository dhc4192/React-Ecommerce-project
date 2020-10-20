import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getProductTypes } from "../../services/product_type";
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
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeRef, setProductTypeRef] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProductTypes();
    loadTreatTypes();
  }, []);

  const loadProductTypes = () =>
    getProductTypes().then((productTypeRef) =>
      setProductTypes(productTypeRef.data)
    );

  const loadTreatTypes = () =>
    getTreatTypes().then((treatType) => setTreatTypes(treatType.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createTreatType({ name, productTypeRef }, user.token)
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

  const searched = (searchName) => (treatType) =>
    treatType.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Treat Type</h4>
        <div>
          <label>Product Type: </label>
          <select onChange={(e) => setProductTypeRef(e.target.value)}>
            <option>Please Select</option>
            {productTypes.length > 0 &&
              productTypes.map((product_type) => (
                <option key={product_type._id} value={product_type._id}>
                  {product_type.name}
                </option>
              ))}
          </select>
        </div>
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
