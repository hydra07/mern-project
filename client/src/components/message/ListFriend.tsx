import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { RootState } from '../../store';
import env from '../../utils/validateEnv';
interface Friend {
  username: string;
  name: string;
  status: string;
  lastActive: string;
}
const ListFriend = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const socket = io(env.VITE_API, {
    path: '/socket',
    query: {
      token: token,
    },
  });
  // const [data, setData] = useState();
  const [listFriend, setListFriend] = useState<Friend[]>();
  useEffect(() => {
    socket.on('userStatus', (friendStatus) => {
      console.log(friendStatus);
      if (listFriend && listFriend.length === 0) {
        setListFriend(() => [
          {
            username: friendStatus.username,
            name: friendStatus.name,
            status: friendStatus.status,
            lastActive: friendStatus.lastActive,
          },
        ]);
      } else {
        listFriend!.forEach(async (friend) => {
          console.log(friend);
          if (friend.username === friendStatus.username) {
            friend.status = friendStatus.status;
            friend.lastActive = friendStatus.lastActive;
          } else {
            const newFriend = {
              username: friendStatus.username,
              name: friendStatus.name,
              status: friendStatus.status,
              lastActive: friendStatus.lastActive,
            } as Friend;
            console.log(newFriend);
          }
        });
      }
    });
    console.log(listFriend);
    return () => {
      socket.off('friendStatus');
    };
  }, [listFriend]);
  return (
    <div>
      <h1>Friends List</h1>
      <ul>
        {listFriend &&
          listFriend.map((friend, index) => (
            <li key={index}>
              <p>{friend.name}</p>
              <p>{friend.status}</p>
              <p>{friend.lastActive}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListFriend;
