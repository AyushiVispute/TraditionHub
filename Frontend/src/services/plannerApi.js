import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const generateItinerary = async (plannerData) => {
  const response = await axios.post(
    `${API_URL}/planner/generate`,
    plannerData
  );

  return response.data;
};

// Alias for PlannerModal.jsx
export const generateTrip = generateItinerary;