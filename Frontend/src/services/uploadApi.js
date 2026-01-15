export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json(); // 👈 ALWAYS parse first

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data; // { url }
  } catch (error) {
    console.error("Upload API error:", error);
    throw error;
  }
};
