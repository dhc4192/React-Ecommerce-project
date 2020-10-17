import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../services/auth";

export default function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setAuthorized(true);
        })
        .catch((error) => {
          toast.error(error.response.data);
          setAuthorized(false);
        });
    }
  }, [user]);

  return authorized ? <Route {...rest} /> : null;
}
