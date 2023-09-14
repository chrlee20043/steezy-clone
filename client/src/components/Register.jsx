import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../helpers/fetching";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const register = await createUser(username, password, name);
      console.log("user: ", register);
      setToken(register.token);
      // console.log(register.token);
      setName("");
      setUsername("");
      setPassword("");
      setSuccessMessage("Yay, you are signed up!");
      return register;
    } catch (error) {
      setError("Please provide valid credentials");
      console.error(error);
    }
  }

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <h1>Create an Account</h1>
        {successMessage && (
          <div>
            <p>{successMessage}</p>
            <p>
              <Link to="/login">Log in</Link>
            </p>
          </div>
        )}
        <label className="label">Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="input"
          value={name}
          placeholder="Your Name"
          required
        />

        <label className="label">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          type="text"
          placeholder="Username"
          required
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder="********"
          required
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>

      <button className="link-button" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
}
