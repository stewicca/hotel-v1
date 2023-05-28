import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
  {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_name: DataTypes.STRING,
    image: DataTypes.TEXT,
    email: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    password: DataTypes.TEXT,
    role: DataTypes.ENUM("admin", "receptionist"),
  },
  {
    freezeTableName: true,
  }
);

export default User;
