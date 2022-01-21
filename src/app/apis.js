import axios from "axios";

const BASE_URL = "https://api.jsonbin.io";
const BIN_ID = "61ea80db3282972ff67ffaf2";
const config = {
  headers: {
    "secret-key": process.env.REACT_APP_SECRET_KEY,
    "content-Type": "application/json",
  },
};

export const fetchData = () => axios.get(`${BASE_URL}/b/${BIN_ID}/`, config);

export const updateData = () => {};
