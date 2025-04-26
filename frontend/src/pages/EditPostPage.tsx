import React from 'react';
import PostForm from '../components/posts/PostForm';

const EditPostPage: React.FC = () => {
  return (
    <div className="page edit-post-page">
      <PostForm mode="edit" />
    </div>
  );
};

export default EditPostPage;