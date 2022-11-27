import axios from "axios";

export const getAllSports = () => {
  return axios.get("/api/sports");
};

export const addSport = (sport) => {
  return axios.post("/api/sports", { sport });
};

export const deleteSport = (sport) => {
  return axios.delete("/api/sports", { data: { sport } });
};
