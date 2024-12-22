import { StatusCodes } from "http-status-codes";
import { FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";
import { TAuthorBlog, TBlog, TBlogQueryParams, TBlogUpdate } from "./blog.interface";
import { Blog } from "./blog.model";
//
const createBlogIntoDB = async (blog: TAuthorBlog) => {
  const newBlog = await Blog.create(blog);
  const blogWithAuthor = await newBlog.populate({
    path: "author",
    select: "name email",
  });
  return blogWithAuthor;
};
//
const getBlogsFromDB = async (queryPayload: TBlogQueryParams) => {
  const { search, sortBy, sortOrder, filter } = queryPayload;

  const query: FilterQuery<TBlog> = {};
  if (search) {
    query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
  }

  if (filter) {
    query.author = filter;
  }

  const sortField = sortBy || "createdAt";
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  const result = await Blog.find(query)
    .sort({ [sortField]: sortDirection })
    .populate({
      path: "author",
      select: "_id name email",
    });

  return result;
};

const getBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate("author", "_id name email");

  if (!result) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");

  return result;
};

//
const updateBlogIntoDB = async (id: string, blogData: TBlogUpdate) => {
  const newBlog = await Blog.findByIdAndUpdate({ _id: id }, blogData, { new: true });
  const blogWithAuthor = await newBlog?.populate({
    path: "author",
    select: "name email",
  });
  return blogWithAuthor;
};

//
const deleteBlogIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
  getBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
