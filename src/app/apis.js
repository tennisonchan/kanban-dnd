import axios from "axios";

const BASE_URL = "https://api.jsonbin.io";
const COLUMNS_BIN_ID = "61ea80db3282972ff67ffaf2";
const NOTES_BIN_ID = "61ea990da785682f9719f4ab";
const config = {
  headers: {
    "secret-key": process.env.REACT_APP_SECRET_KEY,
    "content-Type": "application/json",
  },
};

export const getColumns = () =>
  axios.get(`${BASE_URL}/b/${COLUMNS_BIN_ID}/latest`, config);

export const putColumns = (payload) =>
  // cannot use patch for json bin ...
  axios.put(`${BASE_URL}/b/${COLUMNS_BIN_ID}/`, payload, config);

export const getNotes = () =>
  axios.get(`${BASE_URL}/b/${NOTES_BIN_ID}/latest`, config);

export const putNotes = (payload) =>
  axios.put(`${BASE_URL}/b/${NOTES_BIN_ID}/`, payload, config);
