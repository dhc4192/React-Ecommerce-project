import React from "react";
import { Link } from "react-router-dom";

export default function UserNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/user/history">History</Link>
        </li>
        <li>
          <Link to="/user/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/user/password">Update Password</Link>
        </li>
      </ul>
    </nav>
  );
}
