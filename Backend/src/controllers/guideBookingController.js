import GuideBooking from "../models/GuideBooking.js";

export const getMyGuideBookings = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
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

    res.json({
      bookings,
    });
  } catch (error) {
    console.error("Get my guide bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch guide requests",
    });
    
  }
  
};

export const getGuideBookingRequests = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Only admin can currently manage all guide requests
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const bookings = await GuideBooking.find()
      .populate(
        "guide",
        "name city state photo pricePerHour"
      )
      .populate(
        "user",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.json({
      bookings,
    });
  } catch (error) {
    console.error(
      "Get guide booking requests error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch guide booking requests",
    });
  }
};
export const updateGuideBookingStatus = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Only admin can currently accept/reject requests
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
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
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    const updatedBooking =
      await GuideBooking.findById(booking._id)
        .populate(
          "guide",
          "name city state photo pricePerHour"
        )
        .populate(
          "user",
          "name email"
        );

    res.json({
      message: `Booking ${status} successfully`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(
      "Update guide booking status error:",
      error
    );

    res.status(500).json({
      message: "Failed to update booking status",
    });
  }
};