import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getPostById, createPost, updatePost } from '../../api/posts';
import { Post } from '../../types';

interface PostFormProps {
  mode: 'create' | 'edit';
}

const PostForm: React.FC<PostFormProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (mode === 'create' || !id) return;
      
      try {
        const response = await getPostById(id);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post for editing');
        setLoading(false);
      }
    };

    fetchPost();
  }, [mode, id]);

  const formik = useFormik({
    initialValues: {
      title: post?.title || '',
      content: post?.content || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(100, 'Title cannot be more than 100 characters'),
      content: Yup.string()
        .required('Content is required')
    }),
    onSubmit: async (values) => {
      try {
        if (mode === 'create') {
          await createPost(values);
        } else if (id) {
          await updatePost(id, values);
        }
        navigate('/');
      } catch (err: any) {
        setError(err.message || 'Failed to save post');
      }
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-form-container">
      <h2>{mode === 'create' ? 'Create New Post' : 'Edit Post'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={10}
            {...formik.getFieldProps('content')}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="error">{formik.errors.content}</div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;