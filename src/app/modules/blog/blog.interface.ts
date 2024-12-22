import { Types } from "mongoose";

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};

export type TAuthorBlog = {
  title: string;
  content: string;
  author: string;
};

export type TBlogQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: string;
};

export type TBlogUpdate = {
  title?: string;
  content?: string;
};
