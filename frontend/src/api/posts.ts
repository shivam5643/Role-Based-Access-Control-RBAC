import api from './api';
import { Post, PostFormData } from '../types';

interface PostsResponse {
  success: boolean;
  count: number;
  data: Post[];
}

interface PostResponse {
  success: boolean;
  data: Post;
}

export const getAllPosts = async (): Promise<PostsResponse> => {
  const response = await api.get<PostsResponse>('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<PostResponse> => {
  const response = await api.get<PostResponse>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: PostFormData): Promise<PostResponse> => {
  const response = await api.post<PostResponse>('/posts', data);
  return response.data;
};

export const updatePost = async (id: string, data: PostFormData): Promise<PostResponse> => {
  const response = await api.put<PostResponse>(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};