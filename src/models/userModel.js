//create user model
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // Lưu Refresh Token hiện tại (để đối chiếu)
    refreshToken: {
      type: String,
      select: false, // Mặc định không trả về khi query
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Middleware: Tự động mã hóa password trước khi lưu
// userSchema.pre('save', async function () {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// 🔑 Method: Tự so sánh password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

export default mongoose.model("User", userSchema);
