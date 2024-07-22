import axios from "axios";
import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Define user state and setUser function using useState hook
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  // Make a copy of the user state
  let myUser = { ...user };
  let Navigateto = useNavigate();
  useEffect(() => {
    if (
      user.first_name !== "" ||
      user.last_name !== "" ||
      user.age !== "" ||
      user.email !== "" ||
      user.password !== ""
    ) {
      console.log("User data has been updated:", user);
      // Perform your action here
    }
  }, [user]);

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function validateUserData() {
    let rules = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(15).max(50).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp(/^[A-Z]/)).required(),
      //string consists of alphanumeric characters only and is between 3 and 30 characters in length.
    });
    let valedationresult = rules.validate(user, { abortEarly: false }); // all error
    console.log(valedationresult);
    // You can use `rules` object here for validation or anywhere else in your code
    if (valedationresult.error !== undefined) {
      seterrors(valedationresult.error.details);

      showalert();
      return false;
    } else {
      seterrors([]);
      return true;
    }
  }

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [apimsg, setMsg] = useState(""); // Corrected typo here
  const [errordetails, seterrors] = useState([]);

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function register() {
    if (validateUserData()) {
      //validation is true or sa777777
      let { data } = await axios.post(
        "https://movies-api.routemisr.com/signup",
        user
      );
      setMsg(data.message);
      if (data.message === "success") {
        Navigateto("/Login");
      }
    } else {
      // display error  or feee error
    }
  }
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////
  function showalert(inputName) {
    let x = errordetails.filter((err) => err.path[0] === inputName);
    console.log(x);
    if (x.length > 0) {
      return <p className="text-danger">{x[0].message}</p>;
    } else {
      return null;
    }
  }

  // //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="container">
      <h1>Registration Form</h1>
      {errordetails.map((error) => {
        if (error.message.includes("pattern")) {
          error.message = "Password must start with a capital letter";
        }
        return "";
      })}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => {
            myUser.first_name = e.target.value;
            setUser(myUser);
            console.log(user);
          }}
          className="form-control"
        />
        {errordetails.length > 0 ? showalert("first_name") : ""}
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => {
            myUser.last_name = e.target.value;
            setUser(myUser);
            console.log(user);
          }}
          className="form-control"
        />
        {errordetails.length > 0 ? showalert("last_name") : ""}
        <label>Age:</label>
        <input
          type="text"
          onChange={(e) => {
            myUser.age = e.target.value;
            setUser(myUser);
            console.log(user);
          }}
          className="form-control"
        />
        {errordetails.length > 0 ? showalert("age") : ""}
        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => {
            myUser.email = e.target.value;
            setUser(myUser);
            console.log(user);
          }}
          className="form-control"
        />
        {errordetails.length > 0 ? showalert("email") : ""}
        <label>Password:</label>
        <input
          type="text"
          onChange={(e) => {
            myUser.password = e.target.value;
            setUser(myUser);
            console.log(user);
          }}
          className="form-control"
        />
        {errordetails.length > 0 ? showalert("password") : ""}
        <button type="submit" className="btn btn-info mt-2">
          Register
        </button>{" "}
        {/* Added type="submit" */}
        <h1 className="bg-danger">{apimsg}</h1>
      </form>
    </div>
  );
};

export default Register;
