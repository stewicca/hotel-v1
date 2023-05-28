import Room from "../models/room.model.js";

// Retrieve all Rooms from the database (with condition).
export const getRooms = async (req, res) => {
  try {
    const response = await Room.findAll({
      include: ["room_type"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Find a single Room by Id
export const getRoomById = async (req, res) => {
  try {
    const response = await Room.findOne({
      include: ["room_type"],
      where: {
        room_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create and Save a new Room
export const createRoom = async (req, res) => {
  let data = {
    room_number: req.body.room_number,
    room_type_id: req.body.room_type_id,
  };

  try {
    await Room.create(data);
    res.status(200).json({ msg: "Room Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a Room identified by the id in the request
export const updateRoom = async (req, res) => {
  const room = await Room.findOne({
    where: {
      room_id: req.params.id,
    },
  });
  if (!room) return res.status(404).json({ msg: "Room Not Found" });

  let data = {
    room_number: req.body.room_number,
    room_type_id: req.body.room_type_id,
  };

  try {
    await Room.update(data, {
      where: {
        room_id: room.room_id,
      },
    });
    res.status(200).json({ msg: "Room Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Room with the specified id in the request
export const deleteRoom = async (req, res) => {
  const room = await Room.findOne({
    where: {
      room_id: req.params.id,
    },
  });
  if (!room) return res.status(404).json({ msg: "Room Not Found" });

  try {
    await Room.destroy({
      where: {
        room_id: room.room_id,
      },
    });
    res.status(200).json({ msg: "Room Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
