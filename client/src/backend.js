import axios from "axios";
const backend = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "https://face-recognition-backend-7jvfwimwla-uc.a.run.app",
});

export default backend;
