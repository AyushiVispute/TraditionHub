import mongoose from "mongoose";
import User from "./src/models/User.js";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/traditionHub";

const ADMIN_EMAIL = "admin@traditionhub.com";
const ADMIN_PASSWORD = "Admin@123";

try {
  await mongoose.connect(MONGO_URI);

  console.log("MongoDB connected");

  const existing = await User.findOne({
    email: ADMIN_EMAIL,
  });

  if (existing) {
    existing.role = "admin";
    existing.password = ADMIN_PASSWORD;
    await existing.save();

    console.log("Existing user converted to admin.");
  } else {
    await User.create({
      name: "TraditionHub Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });

    console.log("Admin account created.");
  }

  console.log("--------------------------------");
  console.log("Admin Email:", ADMIN_EMAIL);
  console.log("Admin Password:", ADMIN_PASSWORD);
  console.log("--------------------------------");
} catch (error) {
  console.error("Error:", error.message);
} finally {
  await mongoose.disconnect();
}