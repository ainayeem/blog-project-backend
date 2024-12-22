import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
