import Booking from "../models/booking.model.js";
import RoomType from "../models/roomtype.model.js";
import Room from "../models/room.model.js";
import BookingDetail from "../models/bookingdetail.model.js";

import { Op } from "sequelize";

// Retrieve all Booking from the database (with condition).
export const getBookings = async (req, res) => {
  try {
    const response = await Booking.findAll({
      include: ["user", "room_type"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Find a single Booking by Id
export const getBookingById = async (req, res) => {
  try {
    const response = await Booking.findOne({
      include: ["user", "room_type"],
      where: {
        booking_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create and Save a new Booking
export const createBooking = async (req, res) => {
  let dt = Date.now();
  let receiptNum = Math.floor(
    Math.random() * (1000000000 - 99999999) + 99999999
  );

  let data = {
    booking_number: receiptNum,
    booker_name: req.body.booker_name,
    booker_email: req.body.booker_email,
    booking_date: dt,
    check_in_date: req.body.check_in_date,
    check_out_date: req.body.check_out_date,
    guest_name: req.body.guest_name,
    total_room: req.body.total_room,
    room_type_id: req.body.room_type_id,
    booking_status: "new",
    user_id: req.body.user_id,
  };

  // Room Data
  let roomData = await Room.findAll({
    where: { room_type_id: data.room_type_id },
  });

  // Room Type Data
  let roomTypeData = await RoomType.findAll({
    where: { room_type_id: data.room_type_id },
  });

  // Booking Data
  let bookingData = await RoomType.findAll({
    attributes: ["room_type_id", "room_type_name"],
    where: { room_type_id: data.room_type_id },
    include: [
      {
        model: Room,
        as: "room",
        attributes: ["room_id", "room_type_id"],
        include: [
          {
            model: BookingDetail,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [Op.between]: [data.check_in_date, data.check_out_date],
              },
            },
          },
        ],
      },
    ],
  });

  // Get Available Room
  let bookedRoomId = bookingData[0].room.map((room) => room.room_id);
  let availableRoom = roomData.filter(
    (room) => !bookedRoomId.includes(room.room_id)
  );

  // Process Booking Room Where Status is Available
  let roomDataSelected = availableRoom.slice(0, data.total_room);

  // Count Day
  let checkIn = new Date(data.check_in_date);
  let checkOut = new Date(data.check_out_date);
  const dayTotal = Math.round((checkOut - checkIn) / (1000 * 3600 * 24));

  if (
    roomData === null ||
    availableRoom.length < data.total_room ||
    dayTotal === 0 ||
    roomDataSelected === null
  ) {
    return res.json({ massage: "Room not Available" });
  } else {
    await Booking.create(data)
      .then(async (result) => {
        for (let i = 0; i < dayTotal; i++) {
          for (let j = 0; j < roomDataSelected.length; j++) {
            let access_date = new Date(checkIn);
            access_date.setDate(access_date.getDate() + i);

            let dataDetail = {
              booking_id: result.booking_id,
              room_id: roomDataSelected[j].room_id,
              access_date: access_date,
              price: roomTypeData.price,
            };
            await BookingDetail.create(dataDetail);
          }
        }
        res.status(200).json({ msg: "Booking Created" });
      })
      .catch((error) => res.status(400).json({ msg: error.message }));
  }
};

// Update Booking Status identified by the id in the request
export const updateBooking = async (req, res) => {
  const booking = await Booking.findOne({
    where: {
      booking_id: req.params.id,
    },
  });
  if (!booking) return res.status(404).json({ msg: "Booking Not Found" });

  let data = {
    booking_status: req.body.booking_status,
    user_id: req.body.user_id,
  };

  try {
    await Booking.update(data, {
      where: {
        booking_id: booking.booking_id,
      },
    });
    res.status(200).json({ msg: "Booking Status Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Booking with the specified id in the request
export const deleteBooking = async (req, res) => {
  const booking = await Booking.findOne({
    where: {
      booking_id: req.params.id,
    },
  });
  if (!booking) return res.status(404).json({ msg: "Booking Not Found" });

  try {
    await BookingDetail.destroy({
      where: {
        booking_id: booking.booking_id,
      },
    });
    await Booking.destroy({
      where: {
        booking_id: booking.booking_id,
      },
    });
    res.status(200).json({ msg: "Booking Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
