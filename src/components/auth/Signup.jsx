import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

// import { PageHeader } from "@primer/react/drafts";
import { PageHeader } from "@primer/react/experimental";

import { Box, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/Todo.png";
import { Link } from "react-router-dom";    

const Signup = () => {
  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");
  const [country,setCountry]=useState("");
  const [name,setName]=useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
        alert("Please fill in all fields.");
        return; 
      }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        email: email,
        password: password,
        username: name,
        

      });
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      
      setCurrentUser(res.data.userId);
      setLoading(false);
      
      window.location.href = "/";
    } catch (err) {
     
      console.error("err",err.response.data.message);
      alert(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
      <img className="logo-login"  src={logo} alt="Logo" />

      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

            <form >
        <div className="login-box">
         
          <div>
            <label className="label">Name</label>
            <input
              autoComplete="off"
              name="name"
              id="name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          <Button
            variant="primary"
            className="submit-btn"
            disabled={loading}
            onClick={handleSignup}
            >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </div>
              </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;