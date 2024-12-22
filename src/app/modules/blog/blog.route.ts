import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const router = express.Router();

router.post("/", auth(), validateRequest(BlogValidation.createBlogValidationSchema), BlogControllers.createBlog);
router.get("/", BlogControllers.getAllBlogs);
// router.patch("/:id", auth(), validateRequest(BlogValidation.updateBlogValidationSchema), BlogControllers.updateBlog);

export const BlogRoutes = router;
