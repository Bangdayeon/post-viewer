import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from "../api/posts.ts";
import { Link } from "react-router-dom";

export function PostList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>error: {error.message}</p>;

    return (
        <ul>
            {data.slice(0, 10).map((post: any) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}