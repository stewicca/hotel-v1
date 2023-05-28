import User from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ msg: "Please Login to your Account!" });
  }
  const user = await User.findOne({
    where: {
      user_id: req.session.user_id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not Found!" });
  req.user_id = user.user_id;
  req.role = user.role;
  next();
};

export const receptionistOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      user_id: req.session.user_id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not Found!" });
  if (user.role !== "receptionist")
    return res.status(403).json({ msg: "Access Forbiden" });
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      user_id: req.session.user_id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not Found!" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Access Forbiden" });
  next();
};
