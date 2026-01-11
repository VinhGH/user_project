import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Management API',
            version: '1.0.0',
            description: 'API documentation cho hệ thống quản lý dự án và người dùng',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                // ==================== USER SCHEMAS ====================
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID tự động của MongoDB',
                            example: '507f1f77bcf86cd799439012'
                        },
                        name: {
                            type: 'string',
                            description: 'Tên người dùng',
                            example: 'Nguyễn Văn A'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email người dùng (unique)',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Mật khẩu người dùng',
                            example: '123456'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian tạo',
                            example: '2026-01-11T09:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian cập nhật',
                            example: '2026-01-11T09:00:00.000Z'
                        }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Tên người dùng',
                            example: 'Nguyễn Văn A'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email người dùng',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Mật khẩu',
                            example: '123456'
                        }
                    }
                },

                // ==================== PROJECT SCHEMAS ====================
                Project: {
                    type: 'object',
                    required: ['name', 'owner'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID tự động của MongoDB',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            description: 'Tên dự án',
                            example: 'Website E-commerce'
                        },
                        description: {
                            type: 'string',
                            description: 'Mô tả dự án',
                            example: 'Xây dựng website bán hàng trực tuyến'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            default: 'pending',
                            description: 'Trạng thái dự án',
                            example: 'in-progress'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Ngày bắt đầu dự án',
                            example: '2026-01-11T09:00:00.000Z'
                        },
                        owner: {
                            type: 'string',
                            description: 'ID của user tạo dự án (hoặc object User nếu đã populate)',
                            example: '507f1f77bcf86cd799439012'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian tạo',
                            example: '2026-01-11T09:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian cập nhật',
                            example: '2026-01-11T09:00:00.000Z'
                        }
                    }
                },
                ProjectInput: {
                    type: 'object',
                    required: ['name', 'owner'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Tên dự án',
                            example: 'Website E-commerce'
                        },
                        description: {
                            type: 'string',
                            description: 'Mô tả dự án',
                            example: 'Xây dựng website bán hàng trực tuyến'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Trạng thái dự án',
                            example: 'pending'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Ngày bắt đầu dự án',
                            example: '2026-01-11T09:00:00.000Z'
                        },
                        owner: {
                            type: 'string',
                            description: 'ID của user tạo dự án',
                            example: '507f1f77bcf86cd799439012'
                        }
                    }
                },
                ProjectUpdate: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Tên dự án',
                            example: 'Website E-commerce Updated'
                        },
                        description: {
                            type: 'string',
                            description: 'Mô tả dự án',
                            example: 'Cập nhật mô tả dự án'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Trạng thái dự án',
                            example: 'completed'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Ngày bắt đầu dự án',
                            example: '2026-01-15T09:00:00.000Z'
                        }
                    }
                },

                // ==================== RESPONSE SCHEMAS ====================
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Thao tác thành công'
                        },
                        data: {
                            type: 'object',
                            description: 'Dữ liệu trả về'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Có lỗi xảy ra'
                        },
                        errorCode: {
                            type: 'string',
                            description: 'Mã lỗi cụ thể',
                            example: 'RESOURCE_NOT_FOUND'
                        }
                    }
                }
            },
            responses: {
                // Response 400 - Bad Request
                BadRequest: {
                    description: 'Dữ liệu đầu vào không hợp lệ',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            example: {
                                success: false,
                                message: 'Dữ liệu không hợp lệ',
                                errorCode: 'VALIDATION_ERROR'
                            }
                        }
                    }
                },
                // Response 404 - Not Found
                NotFound: {
                    description: 'Không tìm thấy tài nguyên',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            examples: {
                                projectNotFound: {
                                    summary: 'Không tìm thấy dự án',
                                    value: {
                                        success: false,
                                        message: 'Không tìm thấy dự án',
                                        errorCode: 'PROJECT_NOT_FOUND'
                                    }
                                },
                                userNotFound: {
                                    summary: 'Không tìm thấy người dùng',
                                    value: {
                                        success: false,
                                        message: 'Không tìm thấy người dùng',
                                        errorCode: 'USER_NOT_FOUND'
                                    }
                                }
                            }
                        }
                    }
                },
                // Response 500 - Internal Server Error
                InternalServerError: {
                    description: 'Lỗi hệ thống',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            example: {
                                success: false,
                                message: 'Lỗi hệ thống',
                                errorCode: 'INTERNAL_ERROR'
                            }
                        }
                    }
                }
            },
            parameters: {
                // Path parameter cho ID
                IdParam: {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        pattern: '^[0-9a-fA-F]{24}$'
                    },
                    description: 'MongoDB ObjectId (24 ký tự hex)',
                    example: '507f1f77bcf86cd799439011'
                }
            }
        },
        tags: [
            {
                name: 'Users',
                description: 'API quản lý người dùng'
            },
            {
                name: 'Projects',
                description: 'API quản lý dự án'
            }
        ]
    },
    // Đường dẫn tới các file chứa JSDoc comments
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
