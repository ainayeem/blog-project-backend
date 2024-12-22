import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});

const blockUser = catchAsync(async (req, res) => {
  const user = req.user;
  const userId = req.params.userId;

  if (user?.role !== "admin") throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

  const payload = { isBlocked: true };
  await UserServices.updateUserIntoDB(userId, payload);

  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: StatusCodes.OK,
    data: undefined,
  });
});

export const UserControllers = {
  createUser,
  blockUser,
};
