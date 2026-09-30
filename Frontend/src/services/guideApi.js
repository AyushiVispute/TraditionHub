const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchGuides = async () => {
  const response = await fetch(`${API_URL}/api/guides`);

  if (!response.ok) {
    throw new Error("Failed to fetch guides");
  }

  return response.json();
};

export const fetchGuideById = async (id) => {
  const response = await fetch(`${API_URL}/api/guides/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch guide");
  }

  return response.json();
};

export const fetchMyGuideBookings = async (token) => {
  const response = await fetch(`${API_URL}/api/guides/bookings/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch guide requests");
  }

  return data.bookings;
};
export const fetchAllGuideBookings = async (token) => {
  const response = await fetch(
    `${API_URL}/api/guides/bookings/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch booking requests"
    );
  }

  return data.bookings;
};


export const updateGuideBookingStatus = async (
  bookingId,
  status,
  token
) => {
  const response = await fetch(
    `${API_URL}/api/guides/bookings/${bookingId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update booking"
    );
  }

  return data;
};
export const bookGuide = async (id, bookingData, token) => {
  const response = await fetch(
    `${API_URL}/api/guides/${id}/book`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to request guide"
    );
  }

  return data;
};