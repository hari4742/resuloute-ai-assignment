import { useState } from "react";
import backend from "../../backend";
import "./register.css";
const Register = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fields);
    e.target.disabled = true;
    if (fields.name === "" || fields.email === "" || fields.img === "") {
      alert("All fields are required.");
      return;
    }

    const response = await backend.post("/register", fields, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // console.log(response);
    if (response.data.id) {
      alert("User registered Successfully");
      document.querySelector("#register-form").reset();
    }
    e.target.disabled = false;
  };

  const handleInputChange = (field) => {
    return (e) => {
      setFields((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  const handleFileChange = (e) => {
    setFields((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };
  return (
    <div className="register">
      <form id="register-form">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleInputChange("name")}
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange("email")}
          placeholder="Email"
          required
        />
        <input
          type="file"
          name="img"
          id="image"
          onChange={handleFileChange}
          required
        />
        <input type="submit" value="Register" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Register;
