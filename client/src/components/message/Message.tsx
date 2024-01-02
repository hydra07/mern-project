import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { RootState } from '../../store';
import env from '../../utils/validateEnv';
const Message = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const socket = io(env.VITE_API, {
    path: '/socket',
    query: {
      token: token,
    },
  });
  useEffect(() => {
    socket.on('message', handleClick);
  });
  const handleClick = () => {
    console.log('button');
    socket.emit('message', {
      token: token,
      message: 'hello',
    });
  };
  return (
    <div className="bg-green-600 pt-9">
      <button onClick={handleClick} className="items-center bg-red-800 p-10">
        Click me!
      </button>
    </div>
  );
};

export default Message;
