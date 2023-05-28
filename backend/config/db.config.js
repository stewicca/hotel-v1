import { Sequelize } from "sequelize";

const db = new Sequelize("hoteldb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
