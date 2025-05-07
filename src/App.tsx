
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { PostList } from './components/PostList.tsx';
import { PostDetail } from './components/PostDetail.tsx';

function App() {
  return (
    <div>
      <h1 style={{ color: 'black', textAlign: 'center' }}>게시판</h1>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
    </div>
  );
}

export default App;
