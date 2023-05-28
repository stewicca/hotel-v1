import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

import RoomType from "./roomtype.model.js";

const { DataTypes } = Sequelize;

const Room = db.define(
  "room",
  {
    room_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    room_number: DataTypes.INTEGER,
    room_type_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
RoomType.hasMany(Room, { foreignKey: "room_type_id", as: "room" });
Room.belongsTo(RoomType, { foreignKey: "room_type_id", as: "room_type" });

export default Room;
