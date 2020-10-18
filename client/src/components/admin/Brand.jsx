import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createBrand, getBrands, deleteBrand } from "../../services/brand";
import AdminNav from "../nav/AdminNav";

export default function Brand() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [brands, setBrands] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => getBrands().then((brand) => setBrands(brand.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createBrand({ name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadBrands();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      deleteBrand(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadBrands();
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

  const searched = (searchName) => (brand) =>
    brand.name.toLowerCase().includes(searchName);

  return (
    <div>
      <AdminNav />
      <div>
        <h4>Add Brand</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Brand"
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
        {brands.filter(searched(searchName)).map((brand) => (
          <div key={brand._id}>
            {brand.name}
            <span onClick={() => handleRemove(brand.slug)}>
              <DeleteOutlined />
            </span>
            <Link to={`/admin/brand/${brand.slug}`}>
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
