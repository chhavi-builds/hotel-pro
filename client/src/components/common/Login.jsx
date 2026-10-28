import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/auth/Login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert(res.data.msg);
      
      if (res.data.user.userType === "Admin") {
        navigate("/adminhome");
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login for the Account</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <input type="email" name="email" className="form-control mb-3" placeholder="Email address" required onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100 mb-2">LOGIN</button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/signup">Register</Link></p>
    </div>
  );
};

export default Login;