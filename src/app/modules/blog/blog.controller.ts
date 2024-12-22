import { StatusCodes } from "http-status-codes";
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
  // console.log("🚀 ~ getAllBlog ~ result:", result);

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

// const updateBlog = catchAsync(async (req, res) => {
//   const { title, content } = req.body;
//   const userId = req.user.userId;

//   const result = await BlogServices.updateBlogIntoDB({ title, content, author: userId });

//   sendResponse(res, {
//     success: true,
//     message: "Blog updated successfully",
//     statusCode: StatusCodes.OK,
//     data: {
//       _id: result._id,
//       title,
//       content,
//       author: result.author,
//     },
//   });
// });

export const BlogControllers = {
  createBlog,
  getAllBlogs,
};
