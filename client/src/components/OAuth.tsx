import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import app from '../firebase';
import { User } from '../redux/interface';
import { AppDispatch } from '../redux/store';
import { google } from '../redux/user/userSlice';
const OAuth = () => {
  const dispastch = useDispatch<AppDispatch>();
  const hanldeGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const data: User = {
        name: result.user?.displayName,
        email: result.user?.email,
        phone: result.user?.phoneNumber,
        avatar: result.user?.photoURL,
      };
      dispastch(google(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={hanldeGoogleClick}
      type="button"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
