// src/components/PostFilter.tsx
import React from 'react';
import { usePostFilterStore } from '../store/usePostFilterStore.ts';

const PostFilter = () => {
    const {category, setCategory, resetCategory, getCategory} = usePostFilterStore();

    return (
        <div>
            <input
                type="text"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                placeholder="type to find"
                />
            <button onClick={resetCategory}>Reset</button>
            <button onClick={()=> alert(`filter: ${getCategory()}`)}>check the value of getCategory</button>
        </div>
    );
};

export default PostFilter;