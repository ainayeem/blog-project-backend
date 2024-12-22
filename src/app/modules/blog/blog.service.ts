import { FilterQuery } from "mongoose";
import { TAuthorBlog, TBlog, TBlogQueryParams } from "./blog.interface";
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

  // console.log("🚀 ~ getBlogsFromDB ~ result:", result);
  return result;
};
//
// const updateBlogIntoDB = async () => {};

export const BlogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
};
