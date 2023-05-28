import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

import Booking from "./booking.model.js";
import Room from "./room.model.js";
import RoomType from "./roomtype.model.js";

const { DataTypes } = Sequelize;

const BookingDetail = db.define(
  "booking_detail",
  {
    booking_detail_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    booking_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    access_date: DataTypes.DATE,
    price: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

Booking.hasMany(BookingDetail, {
  foreignKey: "booking_id",
  as: "booking_detail",
});
BookingDetail.belongsTo(Booking, { foreignKey: "booking_id", as: "booking" });

Room.hasMany(BookingDetail, { foreignKey: "room_id", as: "booking_detail" });
BookingDetail.belongsTo(Room, { foreignKey: "room_id", as: "room" });

export default BookingDetail;
