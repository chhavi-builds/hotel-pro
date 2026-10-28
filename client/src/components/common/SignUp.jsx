import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", c_password: "", phone: "", userType: "Ordinary"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.c_password) {
      return alert("Passwords do not match!");
    }
    
    try {
      const res = await axios.post("http://localhost:8001/api/auth/SignUp", formData);
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Register for the Account</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" className="form-control mb-3" placeholder="Email Address" required onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" required onChange={handleChange} />
        <input type="password" name="c_password" className="form-control mb-3" placeholder="Confirm Password" required onChange={handleChange} />
        <input type="number" name="phone" className="form-control mb-3" placeholder="Enter Mobile no." required onChange={handleChange} />
        <select name="userType" className="form-control mb-3" onChange={handleChange}>
          <option value="Ordinary">Customer (Ordinary)</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary w-100 mb-2">REGISTER</button>
      </form>
      <p className="mt-3">Had an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;