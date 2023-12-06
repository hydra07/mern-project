import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">{user?.email}</h2>
        <p className="text-gray-500">{user?.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
