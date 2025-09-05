import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    email: {
      type: String,
      lowerCase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
