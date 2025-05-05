import { useAuth } from './AuthContext';

export const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.nom} {user.prenom}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
};