import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/posts.ts";
import React from "react";
import { CommentForm } from "./CommentForm.tsx";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(postId!),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>error: {error.message}</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <CommentForm postId={postId} />
    </div>
  );
}
