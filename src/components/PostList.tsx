import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost } from "../api/posts.ts";
import PostFilter from "./PostFilter.tsx";
import { usePostFilterStore } from "../store/usePostFilterStore.ts";

export function PostList() {
  const queryClient = useQueryClient();

  // 게시글 목록 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      console.log("fetchPosts 호출됨");
      return getPosts();
    },

    //staleTime, cacheTime 사용
    staleTime: 1000 * 5,
    gcTime: 1000 * 15,
  });

  // 게시글 추가 mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 게시글 추가후 posts 쿼리 무효화 및 (자동)리패치
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post added successfully!👏");
    },
  });

  const handleAddPost = () => {
    const newPost = {
      title: "New Post",
      body: "This is a new post.",
      userId: 1,
    };
    mutation.mutate(newPost);
  };

  // 게시글 필터링 (zustand 사용)
  const { filters } = usePostFilterStore();
  const filteredPosts = data
    ? data.filter((post: any) => {
        return (
          filters.category === "all" ||
          post.title.toLowerCase().includes(filters.category.toLowerCase())
        );
      })
    : [];

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>error: {error.message}</p>;

  return (
    <div>
      <h1>Post List</h1>
      <PostFilter />
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {filteredPosts.slice(0, 10).map((post: any) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
