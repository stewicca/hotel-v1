import User from "../models/user.model.js";
import md5 from "md5";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieve all Users from the database (with condition).
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Find a single User by Id
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create and Save a new User
export const createUser = async (req, res) => {
  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/user/" + req.file.filename;

  let data = {
    user_name: req.body.user_name,
    image: finalImageURL,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
  };

  try {
    await User.create(data);
    res.status(200).json({ msg: "User Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a User identified by the id in the request
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      user_id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });

  let data = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
  };

  if (req.file) {
    let oldImg = await User.findOne({
      where: { user_id: req.params.id },
    });
    let oldImgName = oldImg.foto.replace(
      req.protocol + "://" + req.get("host") + "/user/",
      ""
    );
    let loc = path.join(__dirname, "../public/user", oldImgName);
    fs.unlink(loc, (error) => console.log(error));
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/user/" + req.file.filename;
    data.image = finalImageURL;
  }

  try {
    await User.update(data, {
      where: {
        user_id: user.user_id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a User with the specified id in the request
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      user_id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });

  if (user) {
    let delImgName = user.image.replace(
      req.protocol + "://" + req.get("host") + "/user/",
      ""
    );
    let loc = path.join(__dirname, "../public/roomtype", delImgName);
    fs.unlink(loc, (error) => console.log(error));
  }

  try {
    await User.destroy({
      where: {
        user_id: user.user_id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
