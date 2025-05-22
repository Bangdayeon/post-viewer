import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../api/comments.ts";

interface CommentFormProps {
  postId: number;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      alert("댓글이 등록되었습니다👏");
      console.log(data); // 응답 확인
      setName("");
      setBody("");
    },
    onError: (error: Error) => {
      alert(`error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ postId, name, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>add Comment</h3>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="add your comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isPending}>
        write
      </button>
    </form>
  );
}
