import React, { useState } from "react";
import UserNav from "../nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export default function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <UserNav />
      <h4>Password Update</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          value={password}
        />
        <button
          type="submit"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
