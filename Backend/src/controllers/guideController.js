import Guide from "../models/Guide.js";
import GuideBooking from "../models/GuideBooking.js";

/* =========================================================
   GET ALL GUIDES
========================================================= */

export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });

    res.status(200).json(guides);
  } catch (error) {
    console.error("Get all guides error:", error);

    res.status(500).json({
      message: "Failed to fetch guides",
      error: error.message,
    });
  }
};


/* =========================================================
   GET GUIDE BY ID
========================================================= */

export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);

    if (!guide) {
      return res.status(404).json({
        message: "Guide not found",
      });
    }

    res.status(200).json(guide);
  } catch (error) {
    console.error("Get guide by ID error:", error);

    res.status(500).json({
      message: "Failed to fetch guide",
      error: error.message,
    });
  }
};


/* =========================================================
   CREATE GUIDE - ADMIN
========================================================= */

export const createGuide = async (req, res) => {
  try {
    console.log("CREATE GUIDE BODY:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Check duplicate email before MongoDB throws E11000
    const existingGuide = await Guide.findOne({
      email: email.toLowerCase(),
    });

    if (existingGuide) {
      return res.status(400).json({
        message: "A guide with this email already exists.",
      });
    }

    const guide = await Guide.create(req.body);

    res.status(201).json({
      message: "Guide created successfully",
      guide,
    });
  } catch (error) {
    console.error("Create guide error:", error);

    // MongoDB duplicate key protection
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A guide with this email already exists.",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Failed to create guide",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE GUIDE - ADMIN
========================================================= */

export const updateGuide = async (req, res) => {
  try {
    const { id } = req.params;

    const existingGuide = await Guide.findById(id);

    if (!existingGuide) {
      return res.status(404).json({
        message: "Guide not found",
      });
    }

    // If email is being changed, check whether another guide
    // already uses that email
    if (req.body.email) {
      const duplicateGuide = await Guide.findOne({
        email: req.body.email.toLowerCase(),
        _id: { $ne: id },
      });

      if (duplicateGuide) {
        return res.status(400).json({
          message: "Another guide already uses this email.",
        });
      }
    }

    const updatedGuide = await Guide.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Guide updated successfully",
      guide: updatedGuide,
    });
  } catch (error) {
    console.error("Update guide error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "A guide with this email already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Failed to update guide",
      error: error.message,
    });
  }
};


/* =========================================================
   DELETE GUIDE - ADMIN
========================================================= */

export const deleteGuide = async (req, res) => {
  try {
    const { id } = req.params;

    const guide = await Guide.findById(id);

    if (!guide) {
      return res.status(404).json({
        message: "Guide not found",
      });
    }

    await Guide.findByIdAndDelete(id);

    // Also remove bookings associated with this guide
    await GuideBooking.deleteMany({
      guide: id,
    });

    res.status(200).json({
      message: "Guide deleted successfully",
    });
  } catch (error) {
    console.error("Delete guide error:", error);

    res.status(500).json({
      message: "Failed to delete guide",
      error: error.message,
    });
  }
};


/* =========================================================
   CREATE GUIDE BOOKING - USER
========================================================= */

export const createGuideBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      startTime,
      hours,
      message,
    } = req.body;

    // Auth middleware uses req.user.id
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authenticated user not found",
      });
    }

    const guide = await Guide.findById(id);

    if (!guide) {
      return res.status(404).json({
        message: "Guide not found",
      });
    }

    if (!guide.available) {
      return res.status(400).json({
        message: "This guide is currently unavailable",
      });
    }

    if (!date || !startTime || !hours) {
      return res.status(400).json({
        message: "Date, start time and hours are required",
      });
    }

    const bookingHours = Number(hours);

    if (
      !Number.isInteger(bookingHours) ||
      bookingHours < 1 ||
      bookingHours > 12
    ) {
      return res.status(400).json({
        message: "Hours must be between 1 and 12",
      });
    }

    const totalAmount =
      Number(guide.pricePerHour || 0) * bookingHours;

    const booking = await GuideBooking.create({
      guide: guide._id,
      user: req.user.id,
      date,
      startTime,
      hours: bookingHours,
      pricePerHour: guide.pricePerHour || 0,
      totalAmount,
      message: message || "",
      status: "pending",
    });

    const populatedBooking = await GuideBooking.findById(
      booking._id
    ).populate(
      "guide",
      "name city state photo pricePerHour"
    );

    res.status(201).json({
      message: "Guide request submitted successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create guide booking error:", error);

    res.status(500).json({
      message: "Failed to create guide request",
      error: error.message,
    });
  }
};


/* =========================================================
   GET MY GUIDE BOOKINGS - USER
========================================================= */

export const getMyGuideBookings = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authenticated user not found",
      });
    }

    const bookings = await GuideBooking.find({
      user: req.user.id,
    })
      .populate(
        "guide",
        "name city state photo pricePerHour rating"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get my guide bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch guide requests",
      error: error.message,
    });
  }
};


/* =========================================================
   GET ALL GUIDE BOOKINGS - ADMIN
========================================================= */

export const getGuideBookingRequests = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const bookings = await GuideBooking.find()
      .populate(
        "guide",
        "name email city state photo pricePerHour"
      )
      .populate(
        "user",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get guide booking requests error:", error);

    res.status(500).json({
      message: "Failed to fetch guide booking requests",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE BOOKING STATUS - ADMIN
========================================================= */

export const updateGuideBookingStatus = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "accepted",
      "rejected",
      "cancelled",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    const booking = await GuideBooking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Guide booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    const updatedBooking = await GuideBooking.findById(
      booking._id
    )
      .populate(
        "guide",
        "name email city state photo pricePerHour"
      )
      .populate(
        "user",
        "name email"
      );

    res.status(200).json({
      message: `Booking ${status} successfully`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Update guide booking status error:", error);

    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};