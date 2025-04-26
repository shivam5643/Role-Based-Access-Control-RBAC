import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="page login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;