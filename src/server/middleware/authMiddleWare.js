const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      //set current logged in user
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const restrict = (...role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      res.status(401);
      throw new Error(`Not authorized as an ${req.user.role}`);
    }
  };
};

module.exports = { protect, restrict };
