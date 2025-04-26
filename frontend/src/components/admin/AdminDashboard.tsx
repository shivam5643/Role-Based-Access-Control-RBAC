import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, deletePost } from '../../api/posts';
import { Post } from '../../types';

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deletePost(id);
      // Refresh posts after deletion
      fetchPosts();
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Manage all blog posts from this dashboard.</p>
      
      <div className="admin-actions">
        <Link to="/posts/create" className="create-btn">
          Create New Post
        </Link>
      </div>
      
      <div className="admin-posts">
        <h3>All Posts</h3>
        
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.author.name}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="table-actions">
                    <Link to={`/posts/${post._id}`} className="view-btn">
                      View
                    </Link>
                    <Link to={`/posts/edit/${post._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;