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
