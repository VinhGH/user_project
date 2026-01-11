import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Nhớ đuôi .js
import projectRoutes from './routes/projectRoutes.js'; // Nhớ đuôi .js
import userRoutes from './routes/userRoutes.js'; // Nhớ đuôi .js
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';

// Load biến môi trường
dotenv.config();

const app = express();

// Middleware quan trọng: Giúp Express hiểu được dữ liệu JSON
// Nếu thiếu dòng này, req.body sẽ bị undefined
app.use(express.json());

// ==================== SWAGGER UI ====================
// Truy cập tại: http://localhost:3001/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Project Management API Documentation',
    customfavIcon: '/favicon.ico'
}));

// ==================== ROUTES ====================
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// Kết nối Database
connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});