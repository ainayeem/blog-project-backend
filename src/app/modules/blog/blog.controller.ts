import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  const result = await BlogServices.createBlogIntoDB({ title, content, author: userId });

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: StatusCodes.CREATED,
    data: {
      _id: result._id,
      title,
      content,
      author: result.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const queryPayload = req.query;

  const result = await BlogServices.getBlogsFromDB(queryPayload);

  const formattedResult = result.map((blog) => {
    return { _id: blog?._id, title: blog?.title, content: blog?.content, author: blog?.author };
  });

  sendResponse(res, {
    success: true,
    message: "Blogs fetched successfully",
    statusCode: StatusCodes.OK,
    data: formattedResult,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const blogData = req.body;
  const blogId = req.params.id;

  // chk author
  const postBlog = await BlogServices.getBlogFromDB(blogId);
  if (userId !== postBlog?.author?._id.toString()) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }

  const result = await BlogServices.updateBlogIntoDB(blogId, blogData);
  const formattedResult = { _id: result?._id, title: result?.title, content: result?.content, author: result?.author };

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: StatusCodes.OK,
    data: formattedResult,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const blogId = req.params.id;

  const postBlog = await BlogServices.getBlogFromDB(blogId);

  // chk author
  if (user.role === "user" && user?.userId !== postBlog?.author?._id?.toString()) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }

  await BlogServices.deleteBlogIntoDB(blogId);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
    data: undefined,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
