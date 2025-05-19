// src/store/usePostFilterStore.ts
import {create} from 'zustand';

type PostFilterState = {
    category: string;
    setCategory: (category: string) => void;
    resetCategory: () => void;
    getCategory: () => string;
};

export const usePostFilterStore = create<PostFilterState>((set, get)=> ({
    category: 'all',
    setCategory: (category) => set({category}),
    resetCategory: ()=>set({category: 'all'}),
    getCategory: () => get().category,

}));