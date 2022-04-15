import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";
import Logo from "../assets/logo_transparent.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
    // }, []);
  }, [navigate]);

  const validateForm = () => {
    const { password, username } = values;
    if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        // console.log("false", data);
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Connect</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don''t have an account ? <Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #131324; */
  background-color: #087f5b;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 6.6rem;
    }
    h1 {
      /* color: white; */
      color: #087f5b;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* background-color: #00000076; */
    background-color: #fff;

    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      /* border: 0.1rem solid #4e0eff; */
      border: 0.1rem solid #38d9a9;
      border-radius: 0.4rem;
      /* color: white; */
      color: #000;
      width: 100%;
      font-size: 1rem;
      &:focus {
        /* border: 0.1rem solid #997af0; */
        border: 0.1rem solid #099268;
        outline: none;
      }
    }
    button {
      /* background-color: #997af0; */
      background-color: #38d9a9;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out all;
      &:hover {
        /* background-color: #4e0eff; */
        background-color: #099268;
      }
    }
    span {
      /* color: #fff; */
      color: #000;
      text-transform: uppercase;
      a {
        /* color: #4e0eff; */
        color: #087f5b;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
