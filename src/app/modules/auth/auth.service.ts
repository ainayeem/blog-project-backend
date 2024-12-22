import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credintials");
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, "user is blocked");
  }

  // chk pass
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) throw new AppError(StatusCodes.FORBIDDEN, "Password do not matched");

  // crt jwt
  const jwtPayload = {
    // userId: user,
    userId: user._id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "5d",
  });

  return { token: accessToken };
};
export const AuthServices = {
  loginUser,
};
