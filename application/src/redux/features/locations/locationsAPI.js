import axios from "axios";

export const getLocations = () => {
  return axios.get("/api/locations");
};

export const addLocation = (location) => {
  return axios.post("/api/locations", { location })
};

export const updateLocation = (location) => {
  return axios.patch("/api/locations", { location });
};

export const deleteLocation = (location) => {
  return axios.delete("/api/locations", { data: { location } })
};
