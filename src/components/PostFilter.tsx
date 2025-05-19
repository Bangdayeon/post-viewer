// src/components/PostFilter.tsx
import React from 'react';
import { usePostFilterStore } from '../store/usePostFilterStore.ts';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

const PostFilter = () => {
    const {category, setCategory, resetCategory, getCategory} = useStoreWithEqualityFn(
        usePostFilterStore,
            state=>({
                category: state.category,
                setCategory: state.setCategory,
                resetCategory: state.resetCategory,
                getCategory: state.getCategory
            }),
            shallow
        );

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