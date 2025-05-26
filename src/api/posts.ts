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
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("failed to create post");
  }
  return response.json();
};
