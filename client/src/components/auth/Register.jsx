import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Register({ history }) {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `An Email was sent to ${email}. Please verify to complete your registration.`
    );
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={!email}>
        Register
      </button>
    </form>
  );

  return (
    <div>
      <h4>Register</h4>
      {registerForm()}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}