import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getBase64 } from '../utils/image';
const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState(user);
  const [isEditUser, setIsEditUser] = useState(false);

  const handleEditClick = () => {
    setIsEditUser(true);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    getBase64(file).then((base64) => {
      setEditUser({ ...editUser, [event.target.avatar]: base64 });
    });
    // setEditUser({ ...editUser, avatar: getBase64(file) });
  };
  const handleInputChange = (event: any) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    // console.log(user);
    // event.preventDefault();
    // dispatch(updateUser(editUser));
  };
  // useEffect(() => {
  //   console.log(user);
  // }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-10">Profile</h1>
      {!isEditUser ? (
        <div className="bg-white p-4 rounded shadow w-3/5 h-3/5 flex flex-col relative">
          <div className="flex justify-center -mt-12">
            <img
              src={`data:image/png;base64,${user?.avatar}`}
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
              type="image"
              name="avatar"
              alt="User avatar"
              src={`data:image/png;base64,${editUser?.avatar}`}
              className="w-24 h-24 rounded-full mb-4 content-center shadow-md"
            />
          </div>
          <div className="text-center mt-2 mb-5">
            <input
              className="text-2xl font-semibold mb-2 text-center focus:outline-none"
              id="name"
              name="name"
              value={editUser?.name || ''}
              onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="address" className="font-medium w-full flex">
              Address:
              <input
                type="text"
                name="address"
                id="adress"
                className="ml-5 w-full focus:outline-none"
                value={editUser?.address || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mt-auto flex justify-center flex">
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
    </div>
  );
};

export default Profile;
