import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, gender, image } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      phone,
      gender,
      image,
    });
  } catch (error) {
    console.log("error", error);
  }
};
