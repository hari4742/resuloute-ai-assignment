import { useState } from "react";
import backend from "../backend";
const Recognise = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage === null) {
      alert("No Image is selected.");
      return;
    }
    e.target.disabled = true;
    try {
      const response = await backend.post(
        "/recognise",
        {
          img: selectedImage,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      if (response.data.message === "User Found") {
        setMessage(`Name: ${response.data.user.name}`);
      }
    } catch (error) {
      console.log(error);
    }
    e.target.disabled = false;
  };

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  return (
    <div className="recognise">
      <form>
        <input type="file" name="img" id="image" onChange={handleChange} />
        <input type="submit" value="Recognise" onClick={handleSubmit} />
      </form>
      <div className="message">{message}</div>
    </div>
  );
};

export default Recognise;
