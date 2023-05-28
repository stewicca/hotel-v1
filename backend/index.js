import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.config.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/user.route.js";
import AuthRoute from "./routes/auth.route.js";
import RoomTypeRoute from "./routes/roomtype.route.js";
import RoomRoute from "./routes/room.route.js";
import BookingRoute from "./routes/booking.route.js";
import BookingDetailRoute from "./routes/bookingdetail.route.js";
import FilteringRoute from "./routes/filtering.route.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(UserRoute);
app.use(AuthRoute);
app.use(RoomTypeRoute);
app.use(RoomRoute);
app.use(BookingRoute);
app.use(BookingDetailRoute);
app.use(FilteringRoute);

// (async () => {
//   await db.sync();
// })();

// store.sync();

app.listen(process.env.PORT, () => {
  console.log("Server Running at localhost:8000");
});
