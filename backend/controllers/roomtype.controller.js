import RoomType from "../models/roomtype.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieve all Room Type from the database (with condition).
export const getRoomTypes = async (req, res) => {
  try {
    const response = await RoomType.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Find a single Room Type by Id
export const getRoomTypeById = async (req, res) => {
  try {
    const response = await RoomType.findOne({
      where: {
        room_type_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create and Save a new Room Type
export const createRoomType = async (req, res) => {
  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/roomtype/" + req.file.filename;

  let data = {
    room_type_name: req.body.room_type_name,
    price: req.body.price,
    description: req.body.description,
    image: finalImageURL,
  };

  try {
    await RoomType.create(data);
    res.status(200).json({ msg: "Room Type Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a Room Type identified by the id in the request
export const updateRoomType = async (req, res) => {
  const roomtype = await RoomType.findOne({
    where: {
      room_type_id: req.params.id,
    },
  });
  if (!roomtype) return res.status(404).json({ msg: "Room Type Not Found" });

  let data = {
    room_type_name: req.body.room_type_name,
    price: req.body.price,
    description: req.body.description,
  };

  if (req.file) {
    let oldImg = await RoomType.findOne({
      where: { room_type_id: req.params.id },
    });
    let odlImgName = oldImg.image.replace(
      req.protocol + "://" + req.get("host") + "/roomtype/",
      ""
    );
    let loc = path.join(__dirname, "../public/roomtype", odlImgName);
    fs.unlink(loc, (error) => console.log(error));
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/roomtype/" + req.file.filename;
    data.image = finalImageURL;
  }

  try {
    await RoomType.update(data, {
      where: {
        room_type_id: roomtype.room_type_id,
      },
    });
    res.status(200).json({ msg: "Room Type Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Room Type with the specified id in the request
export const deleteRoomType = async (req, res) => {
  const roomtype = await RoomType.findOne({
    where: {
      room_type_id: req.params.id,
    },
  });
  if (!roomtype) return res.status(404).json({ msg: "Room Type Not Found" });

  if (roomtype) {
    let oldImgName = roomtype.image.replace(
      req.protocol + "://" + req.get("host") + "/roomtype/",
      ""
    );
    let loc = path.join(__dirname, "../public/roomtype", oldImgName);
    fs.unlink(loc, (error) => console.log(error));
  }

  try {
    await RoomType.destroy({
      where: {
        room_type_id: roomtype.room_type_id,
      },
    });
    res.status(200).json({ msg: "Room Type Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
