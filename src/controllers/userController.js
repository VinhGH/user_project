import * as userService from '../services/userService.js';
import { success, error } from '../utils/response.js';

export const create = async (req, res) => {
    try {
        // req.body cần có: name, email, password
        const newUser = await userService.createUser(req.body);
        return success(res, 'Tạo người dùng thành công', newUser, 201);
    } catch (err) {
        return error(res, 'Lỗi tạo người dùng', 500, err.message);
    }
};

export const getAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return success(res, 'Lấy danh sách người dùng thành công', users);
    } catch (err) {
        return error(res, 'Lỗi hệ thống', 500, err.message);
    }
};

export const getDetail = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return error(res, 'Không tìm thấy người dùng', 404, 'USER_NOT_FOUND');
        return success(res, 'Lấy chi tiết thành công', user);
    } catch (err) {
        return error(res, 'Lỗi hệ thống', 500, err.message);
    }
};
// ... (Tương tự cho Update và Delete)