import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TAccessRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...reqquiredRoles: TAccessRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }

    //chk token validation
    jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorize");
      }

      const role = (decoded as JwtPayload).role;
      if (reqquiredRoles && reqquiredRoles.includes(role)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorize");
      }

      req.user = decoded as JwtPayload;
    });
    next();
  });
};

export default auth;
