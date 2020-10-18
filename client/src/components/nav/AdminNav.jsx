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
          <Link to="/admin/product">Add Products</Link>
        </li>
        <li>
          <Link to="/admin/brand">Add Brands</Link>
        </li>
        <li>
          <Link to="/admin/food_type">Add Food Types</Link>
        </li>
        <li>
          <Link to="/admin/treat_type">Add Treat Types</Link>
        </li>
        <li>
          <Link to="/admin/supply_type">Add Supply Types</Link>
        </li>
        <li>
          <Link to="/admin/category">Add Categories</Link>
        </li>
        <li>
          <Link to="/admin/subcategory">Add Sub-Categories</Link>
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
