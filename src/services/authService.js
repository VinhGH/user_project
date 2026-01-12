import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// Hàm utility: Tạo Access Token
export const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h", // 24 giờ
  });
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d", // 7 ngày
    }
  );

  return { accessToken, refreshToken };
};

// 1. Đăng ký người dùng mới
export const registerUser = async (name, email, password, role) => {
  // Kiểm tra email có tồn tại hay không
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email đã tồn tại");
  }

  // Hash password trước khi lưu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo user mới
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role, // role mặc định sẽ là 'user' nếu model quy định, hoặc do FE gửi lên
  });

  return newUser;
};

// 2. Đăng nhập
export const loginUser = async (userData) => {
  const { email, password } = userData;

  // Kiểm tra email có tồn tại hay không
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email không tồn tại");
  }

  // Kiểm tra password có đúng hay không (dùng method từ model)
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Mật khẩu không đúng");
  }

  // Tạo token
  const tokens = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    tokens,
  };
};
