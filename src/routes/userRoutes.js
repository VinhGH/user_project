import express from "express";
// Import các hàm xử lý từ controller (có đuôi .js)
import {
    create,
    getAll,
    getDetail,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo người dùng mới
 *     description: Endpoint để tạo một người dùng mới trong hệ thống
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           examples:
 *             example1:
 *               summary: Tạo user thông thường
 *               value:
 *                 name: "Nguyễn Văn A"
 *                 email: "nguyenvana@example.com"
 *                 password: "123456"
 *             example2:
 *               summary: Tạo user admin
 *               value:
 *                 name: "Admin User"
 *                 email: "admin@example.com"
 *                 password: "admin123"
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tạo người dùng thành công"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               message: "Tạo người dùng thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439012"
 *                 name: "Nguyễn Văn A"
 *                 email: "nguyenvana@example.com"
 *                 password: "123456"
 *                 createdAt: "2026-01-11T09:00:00.000Z"
 *                 updatedAt: "2026-01-11T09:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         description: Lỗi tạo người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               duplicateEmail:
 *                 summary: Email đã tồn tại
 *                 value:
 *                   success: false
 *                   message: "Lỗi tạo người dùng"
 *                   errorCode: "E11000 duplicate key error collection"
 *               generalError:
 *                 summary: Lỗi chung
 *                 value:
 *                   success: false
 *                   message: "Lỗi tạo người dùng"
 *                   errorCode: "CREATE_USER_ERROR"
 */
router.post("/", create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     description: Endpoint để lấy danh sách tất cả người dùng trong hệ thống
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Lấy danh sách người dùng thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               message: "Lấy danh sách người dùng thành công"
 *               data:
 *                 - _id: "507f1f77bcf86cd799439012"
 *                   name: "Nguyễn Văn A"
 *                   email: "nguyenvana@example.com"
 *                   password: "123456"
 *                   createdAt: "2026-01-11T09:00:00.000Z"
 *                   updatedAt: "2026-01-11T09:00:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   name: "Trần Thị B"
 *                   email: "tranthib@example.com"
 *                   password: "password123"
 *                   createdAt: "2026-01-10T09:00:00.000Z"
 *                   updatedAt: "2026-01-10T09:00:00.000Z"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Lỗi hệ thống"
 *               errorCode: "INTERNAL_ERROR"
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy chi tiết một người dùng
 *     description: Endpoint để lấy thông tin chi tiết của một người dùng theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Lấy chi tiết người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Lấy chi tiết thành công"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               message: "Lấy chi tiết thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439012"
 *                 name: "Nguyễn Văn A"
 *                 email: "nguyenvana@example.com"
 *                 password: "123456"
 *                 createdAt: "2026-01-11T09:00:00.000Z"
 *                 updatedAt: "2026-01-11T09:00:00.000Z"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Không tìm thấy người dùng"
 *               errorCode: "USER_NOT_FOUND"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Lỗi hệ thống"
 *               errorCode: "INTERNAL_ERROR"
 */
router.get("/:id", getDetail);

export default router;