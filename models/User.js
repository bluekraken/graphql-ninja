const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please supply a name"]
    }
  },
  {
    timestamps: true
  }
);

// Hash the plain text password before saving
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }

//   next();
// });

// Sign JWT and return
// UserSchema.methods.getSignedJwt = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });
// };

// Generate and hash a reset password token
// UserSchema.methods.getResetPasswordToken = function () {
//   // Generate the token
//   const token = crypto.randomBytes(20).toString("hex");

//   // Hash the token and update the resetPasswordToken field
//   this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

//   // Set the token to expire in 10 minutes (600,000 milliseconds)
//   this.resetPasswordExpire = Date.now() + 600_000;

//   return token;
// };

// Find the user via their login credentials
// UserSchema.statics.findUserByCredentials = async function (email, password) {
//   const user = await User.findOne({ email });

//   if (!user) {
//     return false;
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return false;
//   }

//   return user;
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
