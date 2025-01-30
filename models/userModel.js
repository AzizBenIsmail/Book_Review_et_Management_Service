const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Le mot de passe doit contenir au moins 6 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    user_image: { type: String, required: false, default: "client.png" },

  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
      //cryptage password + statu + createdAt et updatedAt
      const salt = await bcrypt.genSalt()
      const User = this
      User.password = await bcrypt.hash(User.password, salt)
      next()
    } catch (error) {
      next(error)
    }
  })


const User = mongoose.model("User", userSchema);

module.exports = User;
