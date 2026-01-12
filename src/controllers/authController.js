import * as authService from '../services/authService.js';
import { success, error } from '../utils/response.js';
// Cấu hình Cookie cho Refresh Token
const COOKIE_OPTIONS = {
    httpOnly: true, // Cookie chỉ đọc từ server, client không truy cập được → tăng bảo mật
    secure: false, // Để false khi chạy local. Lên production (HTTPS) thì set thành true
    sameSite: 'strict', // Giảm nguy cơ tấn công CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000 // Thời gian sống của cookie: 7 ngày
};
export const register = async (req, res) => {
    console.log("🚀 ~ register ~ req:", req)
    try {
        const newUser = await authService.registerUser(req.body);
        console.log("🚀 ~ register ~ newUser:", newUser)
        return success(res, 'Đăng ký thành công', newUser, 201);
    } catch (err) {
        console.log("🚀 ~ register ~ err:", err)
        return error(res, 'Lỗi hệ thống', 500, err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Gọi service đăng nhập, trả về token + thông tin người dùng
        const { tokens, user } = await authService.loginUser({ email, password });
        console.log("🚀 ~ login ~ tokens:", tokens)

        // Lưu refreshToken vào cookie httpOnly
        res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

        // Trả về accessToken + thông tin user cho client
        res.status(200).json({
            accessToken: tokens.accessToken,
            user,
        });

    } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        res.status(401).json({ message: error.message });
    }
};
// 2. Controller refresh token
export const refresh = async (req, res) => {
    try {
        // Lấy refresh token từ cookie
        const refreshTokenFromCookie = req.cookies.refreshToken;

        // Gọi service để tạo access token mới
        const tokens = await authService.refreshTokenProcess(refreshTokenFromCookie);

        res.status(200).json({
            message: "Lấy token mới thành công",
            accessToken: tokens.accessToken,
        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
// 3. Controller logout
export const logout = async (req, res) => {
    try {
        // Xóa refreshToken trong DB
        await logout(req.user._id);

        // Xóa cookie refreshToken trên browser
        res.clearCookie("refreshToken");

        res.status(200).json({
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Hàm này cần đăng nhập mới gọi được
export const getMe = (req, res) => {
    // req.user đã có sẵn nhờ middleware 'protect'
    return success(res, 'Lấy thông tin thành công', req.user);
};