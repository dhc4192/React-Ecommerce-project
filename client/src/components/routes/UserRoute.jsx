import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : null;
}
