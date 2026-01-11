import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/projectController.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Tạo dự án mới
 *     description: Endpoint để tạo một dự án mới trong hệ thống
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *           examples:
 *             example1:
 *               summary: Tạo dự án website
 *               value:
 *                 name: "Website E-commerce"
 *                 description: "Xây dựng website bán hàng trực tuyến"
 *                 status: "pending"
 *                 owner: "507f1f77bcf86cd799439012"
 *             example2:
 *               summary: Tạo dự án mobile app
 *               value:
 *                 name: "Mobile App iOS"
 *                 description: "Ứng dụng quản lý công việc"
 *                 status: "in-progress"
 *                 startDate: "2026-01-15T09:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439013"
 *     responses:
 *       201:
 *         description: Tạo dự án thành công
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
 *                   example: "Tạo dự án thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         description: Lỗi tạo dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Lỗi tạo dự án"
 *               errorCode: "CREATE_PROJECT_ERROR"
 */
router.post('/', create);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lấy danh sách tất cả dự án
 *     description: Endpoint để lấy danh sách tất cả các dự án trong hệ thống
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Lấy danh sách dự án thành công
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
 *                   example: "Lấy danh sách dự án thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *             example:
 *               success: true
 *               message: "Lấy danh sách dự án thành công"
 *               data:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   name: "Website E-commerce"
 *                   description: "Xây dựng website bán hàng"
 *                   status: "in-progress"
 *                   owner: "507f1f77bcf86cd799439012"
 *                   createdAt: "2026-01-11T09:00:00.000Z"
 *                   updatedAt: "2026-01-11T09:00:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   name: "Mobile App"
 *                   description: "Ứng dụng di động"
 *                   status: "pending"
 *                   owner: "507f1f77bcf86cd799439014"
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
router.get('/', getAll);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Lấy chi tiết một dự án
 *     description: Endpoint để lấy thông tin chi tiết của một dự án theo ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID của dự án (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Lấy chi tiết dự án thành công
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
 *                   $ref: '#/components/schemas/Project'
 *             example:
 *               success: true
 *               message: "Lấy chi tiết thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website E-commerce"
 *                 description: "Xây dựng website bán hàng trực tuyến"
 *                 status: "in-progress"
 *                 startDate: "2026-01-11T09:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *                 createdAt: "2026-01-11T09:00:00.000Z"
 *                 updatedAt: "2026-01-11T09:00:00.000Z"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
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
router.get('/:id', getDetail);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Cập nhật dự án
 *     description: Endpoint để cập nhật thông tin của một dự án theo ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdate'
 *           examples:
 *             updateStatus:
 *               summary: Cập nhật trạng thái dự án
 *               value:
 *                 status: "completed"
 *             updateFull:
 *               summary: Cập nhật đầy đủ thông tin
 *               value:
 *                 name: "Website E-commerce Updated"
 *                 description: "Đã hoàn thành giai đoạn 1"
 *                 status: "in-progress"
 *                 startDate: "2026-01-15T09:00:00.000Z"
 *     responses:
 *       200:
 *         description: Cập nhật dự án thành công
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
 *                   example: "Cập nhật dự án thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *             example:
 *               success: true
 *               message: "Cập nhật dự án thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website E-commerce Updated"
 *                 description: "Đã hoàn thành giai đoạn 1"
 *                 status: "completed"
 *                 startDate: "2026-01-15T09:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *                 createdAt: "2026-01-11T09:00:00.000Z"
 *                 updatedAt: "2026-01-11T10:00:00.000Z"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Xóa dự án
 *     description: Endpoint để xóa một dự án theo ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Xóa dự án thành công
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
 *                   example: "Xóa dự án thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *             example:
 *               success: true
 *               message: "Xóa dự án thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website E-commerce"
 *                 description: "Xây dựng website bán hàng trực tuyến"
 *                 status: "in-progress"
 *                 owner: "507f1f77bcf86cd799439012"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', remove);

export default router;