import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import app from '../config/firebase';
import { AppDispatch } from '../store';
import { User } from '../store/interface';
import { google } from '../store/user/userSlice';
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
