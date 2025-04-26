import React from 'react';
import PostForm from '../components/posts/PostForm';

const CreatePostPage: React.FC = () => {
  return (
    <div className="page create-post-page">
      <PostForm mode="create" />
    </div>
  );
};

export default CreatePostPage;