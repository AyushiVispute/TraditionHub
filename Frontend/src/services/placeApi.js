const BASE_URL = "http://localhost:5000/api/places";

// Get all places (with filters & search)
export const fetchPlaces = async ({
  state = "",
  deity = "",
  search = "",
} = {}) => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);
  if (deity) params.append("deity", deity);
  if (search) params.append("search", search);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  return res.json();
};

// Get single place
export const fetchPlaceById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};
export const createPlace = async (placeData) => {
  const res = await fetch("http://localhost:5000/api/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(placeData),
  });


  return res.json();
};
