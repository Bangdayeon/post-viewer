import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost } from "../api/posts.ts";
import { Link } from "react-router-dom";


export function PostList() {
    const queryClient = useQueryClient();

    // 게시글 목록 가져오기
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    // 게시글 추가 mutation
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // 게시글 추가후 posts 쿼리 무효화 및 (자동)리패치
            queryClient.invalidateQueries({queryKey:['posts']});
            alert('Post added successfully!👏');
        },
    });

    const handleAddPost = () => {
        const newPost = {
            title: 'New Post',
            body: 'This is a new post.',
            userId: 1,
        };
        mutation.mutate(newPost);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>error: {error.message}</p>;

    return (
        <div>
            <h1>Post List</h1>
            <button onClick={handleAddPost}>Add Post</button>
        <ul>
            {data.slice(0, 10).map((post: any) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
        </div>
    )
}