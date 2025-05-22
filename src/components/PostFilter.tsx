// src/components/PostFilter.tsx
import React from 'react';
import { usePostFilterStore } from '../store/usePostFilterStore.ts';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

const PostFilter = () => {
    const {filters, setFilters, resetFilters, getCategory} = useStoreWithEqualityFn(
        usePostFilterStore,
            state=>({
                filters: state.filters,
                setFilters: state.setFilters,
                resetFilters: state.resetFilters,
                getCategory: state.getCategory
            }),
            shallow
        );

    const onCategoryChange = (category: string) => {
        setFilters((draft) => {
            draft.category = category;
        });
    };
    
    const onTagChange = (tag: string) => {
        setFilters((draft) => {
            draft.tag = tag;
        });
    };

    return (
        <div>
            <input
                type="text"
                value={filters.category}
                onChange={(e)=>onCategoryChange(e.target.value)}
                placeholder="category"
            /><br/>
            <input
                type="text"
                value={filters.tag}
                onChange={(e) => onTagChange(e.target.value)}
                placeholder="tag"
            />
            <button onClick={resetFilters}>Reset</button>
        </div>
    );
};

export default PostFilter;