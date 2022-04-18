import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';

import { Context } from '..';

const Login = () => {
  const { auth, provider } = useContext(Context);

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems='center'
        justifyContent={'center'}>
        <Grid
          container
          style={{ width: 500, background: 'white', borderRadius: 20 }}
          justifyContent={'center'}
          flexDirection={'column'}>
          <Box p={5} textAlign={'center'}>
            <Button onClick={login}> Войти с помощью Google</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
