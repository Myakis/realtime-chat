import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Context } from '.';
import AppRouters from './components/AppRouters';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
function App() {
  const { auth } = useContext(Context);
  const [user, loader] = useAuthState(auth);

  return (
    <>
      <Navbar />
      {loader ? <Loader /> : <AppRouters />}
    </>
  );
}

export default App;
