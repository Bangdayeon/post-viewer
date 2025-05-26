import { React, useState } from "react";
import { updatePost } from "../api/posts.ts";

interface PostEditFormProps {
  postId: number;
  initialTitle?: string;
  initialBody?: string;
  userId: number;
}

export default function PostEditForm({
  postId,
  initialTitle = "",
  initialBody = "",
  userId,
}: PostEditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updatePost(postId, { title, body, userId });
      alert("게시글 수정 성공!");
    } catch (err) {
      setError("게시글 수정 실패...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>제목: </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>본문: </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          row={10}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "수정 중..." : "게시글 수정"}
      </button>
    </form>
  );
}
