import React from 'react';
import PostList from '../components/posts/PostList';

const HomePage: React.FC = () => {
  return (
    <div className="page home-page">
      <h1>Blog Posts</h1>
      <PostList />
    </div>
  );
};

export default HomePage;