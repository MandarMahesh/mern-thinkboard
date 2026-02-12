import axios from "axios";
//const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL: "/api",
});
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
        config.headers.userId = user._id;
    }
    return config;
})
export default api;