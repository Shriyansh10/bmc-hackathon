import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const hash = async (token) => {
  const hashedToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return hashedToken;
};

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 1 * 24 * 60 * 60 * 1000,
  });
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || 1 * 24 * 60 * 60 * 1000,
  });
  return refreshToken;
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

const bcryptHash = (password) => {
  return bcrypt.hash(password, 12);
}

const bcryptCompare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

export { hash, verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken , bcryptHash,  bcryptCompare};
