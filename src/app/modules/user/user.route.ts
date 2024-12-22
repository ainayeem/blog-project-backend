import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "../auth/auth.controller";
import { AuthValidation } from "../auth/auth.validation";
import { UserControllers } from "./user.controller";
import { createUserValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/register", validateRequest(createUserValidationSchema), UserControllers.createUser);
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);

export const UserRoutes = router;
