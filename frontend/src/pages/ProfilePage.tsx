import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="page profile-page">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;