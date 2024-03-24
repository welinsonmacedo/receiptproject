import React from 'react';
import { auth } from '../services/firebaseAuth';

const UserEmail = () => {
  const user = auth.currentUser;

  return (
    <div>
      {user && <p> {user.email}</p>}
    </div>
  );
};

export default UserEmail;
