import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as authServices from "./user.service.js";

const register = async (req, res) => {
  const user = await authServices.register(req.body);
  ApiResponse.created(res, "User Created Successfully", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authServices.login(
    req.body,
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  ApiResponse.created(res, "User Login Successfully", { user, accessToken });
};

const profile = async (req, res) => {
  const user = await authServices.profile(req.user);
  ApiResponse.ok(res, "Profile Details", user);
};

const logout = async (req, res) => {
  await authServices.logout(req.user);
  res.cookie("refreshToken", null);
  ApiResponse.ok(res, "Logout Successfull");
};

const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) ApiError.notfound("Refresh Token not found");
  const { user, accessToken, refreshToken } =
    await authServices.refreshToken(token);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  ApiResponse.created(res, "Access Token Refreshed", { user, accessToken });
};

export { register, login, profile, logout, refreshToken };
