import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { Context } from '..';

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar position='static' color={'secondary'}>
      <Toolbar variant='dense'>
        <Grid container justifyContent={'flex-end'}>
          {user ? (
            <Button onClick={() => signOut(auth)} variant='dense'>
              Выйти
            </Button>
          ) : (
            <Link to={'login'}>
              <Button variant='dense'>Логин</Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
