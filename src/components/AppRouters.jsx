import { Navigate, Route, Routes } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './Chat';
import Login from './Login';
import { useContext } from 'react';
import { Context } from '..';

const AppRouters = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      <Route path='/chat' element={<Chat />} />
      <Route path='/*' element={<Navigate to={'/chat'} replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default AppRouters;
