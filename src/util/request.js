import axios from "axios";

// từ .env
// console.log(process.env)

const request = axios.create({
    baseURL: "https://tiktok.fullstack.edu.vn/api/"
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

export default request;