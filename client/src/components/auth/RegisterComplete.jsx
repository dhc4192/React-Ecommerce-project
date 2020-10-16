import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export default function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        history.push("/");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} disabled />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <button type="submit">Complete Registration</button>
    </form>
  );

  return (
    <div>
      <div>
        <div>
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
}
