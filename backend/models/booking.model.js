import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

import User from "./user.model.js";
import RoomType from "./roomtype.model.js";

const { DataTypes } = Sequelize;

const Booking = db.define(
  "booking",
  {
    booking_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    booking_number: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    booker_name: DataTypes.STRING,
    booker_email: DataTypes.STRING,
    booking_date: DataTypes.DATE,
    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE,
    guest_name: DataTypes.STRING,
    total_room: DataTypes.INTEGER,
    room_type_id: DataTypes.INTEGER,
    booking_status: DataTypes.ENUM("new", "check_in", "check_out"),
    user_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Booking, { foreignKey: "user_id", as: "booking" });
Booking.belongsTo(User, { foreignKey: "user_id", as: "user" });

RoomType.hasMany(Booking, { foreignKey: "room_type_id", as: "booking" });
Booking.belongsTo(RoomType, { foreignKey: "room_type_id", as: "room_type" });

export default Booking;
