import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../api/posts';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();
  const { user } = state;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="posts-container">
      {user && (
        <div className="create-post-btn">
          <Link to="/posts/create">Create New Post</Link>
        </div>
      )}
      
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-author">By {post.author.name}</p>
              <p className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/posts/${post._id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;