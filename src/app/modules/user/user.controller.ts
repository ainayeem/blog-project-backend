import { StatusCodes } from "http-status-codes";
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

export const UserControllers = {
  createUser,
};
