import React from "react";
import { deletePost } from "../api/posts.ts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface DeleteButtonProps {
  postId: number;
  onSuccessRedirectTo?: string;
}

export function DeleteButton({
  postId,
  onSuccessRedirectTo = "/",
}: DeleteButtonProps) {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(`삭제 실패: ${error.message}`);
      }
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return <button onClick={handleDelete}>게시글 삭제</button>;
}
