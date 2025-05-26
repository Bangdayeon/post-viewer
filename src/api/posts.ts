import { api } from "../lib/axios.ts";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPostsById = async (id: number) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (newPost: {
  title: string;
  body: string;
  userId: number;
}) => {
  const res = await api.post("/posts", newPost);
  return res.data;
};

export const updatePost = async (
  id: number,
  updatedPost: {
    title: string;
    body: string;
    userId: number;
  }
) => {
  const res = await api.put(`/posts/${id}`, updatedPost);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  return res.status === 200;
};
