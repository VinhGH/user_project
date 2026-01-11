import User from '../models/userModel.js';

// Logic nghiệp vụ (Xử lý dữ liệu)
export const createUser = async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
};

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (userId) => {
    return await User.findById(userId);
};

export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};
