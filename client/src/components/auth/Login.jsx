import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        autoFocus
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={!email || password.length < 6}>
        Log In
      </button>
    </form>
  );

  return (
    <div>
      {loading ? <h4>Welcome Back!</h4> : <h4>Log In</h4>}
      {loginForm()}
      <button onClick={googleLogin}>
        <GoogleOutlined /> | Log in with Google
      </button>
      <Link to="/forgot/password">Forgot Password?</Link>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}
