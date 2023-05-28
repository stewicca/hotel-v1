import User from "../models/user.model.js";

export const login = async (req, res) => {
  let params = { email: req.body.email };

  const user = await User.findOne({ where: params });
  if (!user) return res.status(404).json({ msg: "User not Found!" });
  const match = req.body.password;
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.user_id = user.user_id;
  res.status(200).json({ msg: "Login Success" });
};

export const me = async (req, res) => {
  let params = { user_id: req.session.user_id };

  if (!req.session.user_id) {
    return res.status(401).json({ msg: "Please Login to your Account!" });
  }
  const user = await User.findOne({ where: params });
  if (!user) return res.status(404).json({ msg: "User not Found!" });
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Cannot Logout" });
    res.status(200).json({ msg: "You have been logout!" });
  });
};
