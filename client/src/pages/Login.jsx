import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values,
      );

      // Save token regardless of exact status
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to home
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response?.status === 404) {
        setError("We couldn’t find an account with that email.");
      } else if (err.response?.status === 401) {
        setError("Incorrect password.");
      } else if (!err.response) {
        setError("Server not responding. Check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  console.log("Login success, navigating now");
  console.log("token");

  // const handleSumbit = async (e) => {
  //     e.preventDefault()
  //     try {
  //         const response = await axios.post('http://localhost:3000/auth/login', values)
  //         if(response.status === 200) {
  //             localStorage.setItem('token', response.data.token)
  //             navigate('/',{replace: true})
  //         }
  //     } catch(err) {
  //         console.log(err.message)
  //     }
  // }

  return (
    <div className="container-login">
      <div className="login-logo"></div>
      <div className="login-page">
        <div className="flex justify-center items-center h-screen">
          <div className="shadow-lg px-8 py-5 border w-72">
            <h2 className="text-lg font-bold mb-4">Welcome to Coinage</h2>
            <form onSubmit={handleSumbit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="login-input"
                  name="email"
                  required
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="email-input"
                  name="password"
                  required
                  onChange={handleChanges}
                />
              </div>
              <button className="w-full bg-green-600 text-white py-2 ">
                Submit
              </button>
              {/* <button className="w-full bg-green-600 text-white py-2 ">
                Sign Up
              </button> */}

              {/* <div>
                <button className="w-full bg-green-600 text-white py-2 ">
                  Sign Up
                </button>
              </div> */}
            </form>

            <div className="text-center">
              <span>Don't Have Account? </span>

              <Link to="/register" className="text-blue-500">
                Signup
              </Link>

              {error && (
                <div className="text-red-500 mt-3 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div>
            <img
              src="images/Coinage-logo.png"
              className="login-logo2"
              alt="Company-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
