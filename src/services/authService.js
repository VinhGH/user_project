import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Hàm utility: Tạo Access Token
export const generateToken = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '24h', // 24 giờ
    });

    return accessToken;
};

// 1. Đăng ký người dùng mới
export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Kiểm tra email có tồn tại hay không
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Email đã tồn tại");
    }

    // Tạo user mới (password sẽ tự động hash nhờ middleware pre-save trong model)
    const newUser = await User.create({
        name,
        email,
        password,
    });

    // Tạo token
    const token = generateToken(newUser._id);

    return {
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
        token
    };
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
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Mật khẩu không đúng");
    }

    // Tạo token
    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token
    };
};