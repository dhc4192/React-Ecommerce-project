import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getProductTypes } from "../../services/product_type";
import {
  createSupplyType,
  getSupplyTypes,
  deleteSupplyType,
} from "../../services/supply_type";
import AdminNav from "../nav/AdminNav";

export default function SupplyType() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [supplyTypes, setSupplyTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeRef, setProductTypeRef] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProductTypes();
    loadSupplyTypes();
  }, []);

  const loadProductTypes = () =>
    getProductTypes().then((productTypeRef) =>
      setProductTypes(productTypeRef.data)
    );

  const loadSupplyTypes = () =>
    getSupplyTypes().then((supplyType) => setSupplyTypes(supplyType.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createSupplyType({ name, productTypeRef }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSupplyTypes();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteSupplyType(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadSupplyTypes();
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

  const searched = (searchName) => (supplyType) =>
    supplyType.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Supply Type</h4>
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
            placeholder="Supply Type"
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
        {supplyTypes.filter(searched(searchName)).map((supplyType) => (
          <div key={supplyType._id}>
            {supplyType.name}
            <span onClick={() => handleRemove(supplyType.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/supply_type/${supplyType.slug}`}>
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
