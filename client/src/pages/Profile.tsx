import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import app from '../config/firebase';
import { AppDispatch } from '../store';
import { User } from '../store/interface';
import { getProfile, profile } from '../store/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User>();
  const [editUser, setEditUser] = useState<User>();
  const [isEditUser, setIsEditUser] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const fetchProfile = async () => {
    const action = await dispatch(getProfile());
    const fetchUser = action.payload;
    setUser(fetchUser.user);
  };
  const handleEditClick = useCallback(() => {
    setIsEditUser(true);
  }, []);
  const handleChange = useCallback((event: any) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      [event.target.id]: event.target.value,
    }));
  }, []);
  const handleSubmit = useCallback(
    async (event: any) => {
      await event.preventDefault();
      dispatch(profile(editUser!));
      await fetchProfile();
      setIsEditUser(false);
    },
    [dispatch, editUser],
  );
  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => {
        // toast.error(error.message);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setEditUser((prevUser) => ({ ...prevUser, avatar: downloadURL }));
        });
      },
    );
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  useEffect(() => {
    fetchProfile();
  }, [isEditUser]);
  useEffect(() => {
    setEditUser(user);
  }, [user]);
  useEffect(() => {
    if (imagePercent === 100) {
      setUpdateComplete(true);
    }
  }, [imagePercent]);
  useEffect(() => {
    if (imageError) {
      toast.error(`Image upload failed`);
    } else if (updateComplete) {
      toast.success(`Image upload success`);
    }
  }, [imageError, updateComplete]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-10">Profile</h1>
      {!isEditUser ? (
        <div className="bg-white p-4 rounded shadow w-3/5 h-3/5 flex flex-col relative">
          <div className="flex justify-center -mt-12">
            <img
              // src={`data:image/png;base64,${user?.avatar}`}
              src={user?.avatar as string}
              alt="User avatar"
              className="w-24 h-24 rounded-full mb-4 content-center shadow-md"
            />
          </div>
          <div className="text-center mt-2 mb-5">
            <h1 className="text-2xl font-semibold mb-2" id="name">
              {user?.name}
            </h1>
            <p className="text-lg font-bold mb-2">{user?.email}</p>
          </div>
          <div className="text-gray-600 justify-between text-lg ">
            <p>
              <span className="font-medium">Username:</span> {user?.username}
            </p>
            <p>
              <span className="font-medium">Phone: </span> {user?.phone}
            </p>
            <p>
              <span className="font-medium">Birthday: </span> {user?.birthday}
            </p>
            <p>
              <span className="font-medium">Address: </span> {user?.address}
            </p>
          </div>

          <div className="mt-auto flex justify-center">
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded w-1/3 content-center"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow w-3/5 h-3/5 flex flex-col relative"
        >
          <div className="flex justify-center -mt-12">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              id="avatar"
              hidden
              ref={fileRef}
              onChange={(event) => {
                setImage(event.target.files![0]);
              }}
            />
            <img
              src={editUser?.avatar as string}
              alt="User avatar"
              className="w-24 h-24 rounded-full mb-4 content-center shadow-md"
              onClick={() => fileRef.current?.click()}
            />
          </div>
          {/* {imagePercent > 0 && imagePercent < 100 && (
            <div className="progress-bar value-{{ imagePercent }}">
              <span className="progress-bar-text">Đang tải lên...</span>
            </div>
          )} */}
          <div className="text-center mt-2 mb-5">
            <input
              className="text-2xl font-semibold mb-2 text-center focus:outline-none"
              id="name"
              name="name"
              value={editUser?.name || ''}
              onChange={handleChange}
            />
            <p className="text-lg font-bold mb-2">{user?.email}</p>
          </div>
          <div className="text-gray-600 justify-between text-lg flex-col flex ">
            <p>
              <span className="font-medium">Username:</span> {user?.username}
            </p>
            <label htmlFor="phone" className="font-medium w-full flex">
              Phone:
              <input
                type="text"
                name="phone"
                id="phone"
                className="ml-5 w-full focus:outline-none"
                value={editUser?.phone || ''}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="birthday" className="font-medium w-full flex">
              Birthday:
              <input
                type="date"
                name="birthday"
                id="birthday"
                className="ml-5 w-full focus:outline-none"
                value={editUser?.birthday || ''}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="address" className="font-medium w-full flex">
              Address:
              <input
                type="text"
                name="address"
                id="address"
                className="ml-5 w-full focus:outline-none"
                value={editUser?.address || ''}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mt-auto justify-center flex">
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded w-1/3 mx-4 text-bold"
              onClick={() => setIsEditUser(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-2 py-1 rounded w-1/3 mx-4 text-bold"
            >
              Save
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
