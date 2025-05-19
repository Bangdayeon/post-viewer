// src/store/usePostFilterStore.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

type Filters = {
    category: string;
    tag: string;
}

type PostFilterState = {
    filters: Filters;
    setFilters: (updater: (draft: Filters) => void) => void;
    resetFilters: () => void;
    getCategory: () => string;
};

export const usePostFilterStore = create<PostFilterState>()(
    persist((set, get)=> ({
        filters: {
            category: 'all',
            tag: '',
        },
        setFilters: (updater) => {
            set(
                produce((state: PostFilterState) => {
                    updater(state.filters);
                })
            );
        },
        resetFilters: ()=>set(
            produce((state: PostFilterState) => {
                state.filters = { category: 'all', tag: '' };
            })
        ),
        getCategory: () => get().filters.category,
    }),
    {
        name: 'post-filter-storage',
    }
    )
);