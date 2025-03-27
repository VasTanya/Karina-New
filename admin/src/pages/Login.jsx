import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlice } from "../redux/userSlice";
import { defineUserStatus } from "../helpers/defineUserStatus";

import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);
  const message = store.data?.message;
  const status = defineUserStatus(store.data?.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSlice({ email, password }));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          className="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Login"}
        </button>

        <p className="error">{!status ? message : ""}</p>
      </form>
    </div>
  );
}

export default Login;
