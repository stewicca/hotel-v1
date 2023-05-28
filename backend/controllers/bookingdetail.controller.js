import BookingDetail from "../models/bookingdetail.model.js";

export const getBookingDetails = async (req, res) => {
  try {
    const response = await BookingDetail.findAll({
      include: ["booking", "room"],
      where: {
        booking_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
