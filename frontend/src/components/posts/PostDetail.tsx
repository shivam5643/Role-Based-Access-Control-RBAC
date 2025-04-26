import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePost } from '../../api/posts';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { state } = useAuth();
  const { user } = state;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const response = await getPostById(id);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
      await deletePost(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error || !post) {
    return <div className="error-message">{error || 'Post not found'}</div>;
  }

  // Check if user can edit/delete (if user is author or admin)
  const canEditDelete = 
    user && (user.id === post.author._id || user.role === 'admin');

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <p>By {post.author.name}</p>
        <p>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
        {post.updatedAt !== post.createdAt && (
          <p>Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
        )}
      </div>
      
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {canEditDelete && (
        <div className="post-actions">
          <Link to={`/posts/edit/${post._id}`} className="edit-btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      )}
      
      <Link to="/" className="back-btn">
        Back to Posts
      </Link>
    </div>
  );
};

export default PostDetail;