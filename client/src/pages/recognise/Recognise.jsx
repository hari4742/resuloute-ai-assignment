import { useState } from "react";
import backend from "../../backend";
import "./recognise.css";
const Recognise = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState({
    isFound: false,
    response: false,
    info: "",
  });

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
      // console.log(response);
      if (response.data.message === "User Found") {
        setMessage({
          response: true,
          isFound: true,
          name: response.data.user.name,
          email: response.data.user.email,
        });
      } else {
        setMessage({
          response: true,
          isFound: false,
          name: null,
          email: null,
        });
      }
    } catch (error) {
      // console.log(error);
    }
    e.target.disabled = false;
  };

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
    // document.querySelector("#recognise-image")
  };
  return (
    <div className="recognise">
      <form>
        <label for="recognise-image">Upload a Face to Recognise</label>
        <input
          type="file"
          name="img"
          id="recognise-image"
          accept="image/*"
          onChange={handleChange}
        />
        <input type="submit" value="Recognise" onClick={handleSubmit} />
      </form>
      {message.response ? (
        <div className="message">
          {message.isFound ? <h2>User Found</h2> : <h2>User Not Found</h2>}
          {message.isFound ? (
            <>
              <p>{message.name}</p>
              <p>{message.email}</p>
            </>
          ) : (
            <p>Please consider registering yourself.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Recognise;
