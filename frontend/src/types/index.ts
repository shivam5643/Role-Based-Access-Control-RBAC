export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export interface Post {
    _id: string;
    title: string;
    content: string;
    author: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }
  
  export interface PostFormData {
    title: string;
    content: string;
  }