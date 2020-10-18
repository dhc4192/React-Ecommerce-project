import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/product">Add Product</Link>
        </li>
        <li>
          <Link to="/admin/category">Categories</Link>
        </li>
        <li>
          <Link to="/admin/subcategory">Sub-Categories</Link>
        </li>
        <li>
          <Link to="/admin/coupon">Add Coupons</Link>
        </li>
        <li>
          <Link to="/user/password">Update Password</Link>
        </li>
      </ul>
    </nav>
  );
}
