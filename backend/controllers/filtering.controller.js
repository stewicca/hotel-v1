import RoomType from "../models/roomtype.model.js";
import Room from "../models/room.model.js";
import BookingDetail from "../models/bookingdetail.model.js";
import Booking from "../models/booking.model.js";

import { Op } from "sequelize";

export const getAvailableRoomByDate = async (req, res) => {
  let checkInDate = req.body.check_in_date;
  let checkOutDate = req.body.check_out_date;

  let roomData = await RoomType.findAll({
    include: [{ model: Room, as: "room" }],
  });

  let roomBookedData = await RoomType.findAll({
    attributes: ["room_type_id", "room_type_name"],
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            model: BookingDetail,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
          },
        ],
      },
    ],
  });

  let available = [];
  let availableByType = [];

  for (let i = 0; i < roomData.length; i++) {
    roomData[i].room.forEach((room) => {
      let isBooked = false;
      roomBookedData.forEach((booked) => {
        booked.room.forEach((bookedRoom) => {
          if (room.room_id === bookedRoom.room_id) {
            isBooked = true;
          }
        });
      });
      if (!isBooked) {
        available.push(room);
      }
    });
  }

  for (let i = 0; i < roomData.length; i++) {
    let roomType = {};
    roomType.room_type_id = roomData[i].room_type_id;
    roomType.room_type_name = roomData[i].room_type_name;
    roomType.price = roomData[i].price;
    roomType.description = roomData[i].description;
    roomType.image = roomData[i].image;
    roomType.room = [];
    available.forEach((room) => {
      if (room.room_type_id === roomData[i].room_type_id) {
        roomType.room.push(room);
      }
    });
    if (roomType.room.length > 0) {
      availableByType.push(roomType);
    }
  }
  return res.json({ room: availableByType });
};

export const getBookingByGuestName = async (req, res) => {
  let guestName = req.query.guest_name;
  let whereCondition = {
    booker_name: {
      [Op.like]: `%${guestName}%`,
    },
  };
  try {
    const response = await Booking.findAll({
      where: whereCondition,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
