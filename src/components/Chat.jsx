import { Button, Grid, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Context } from '..';

const Chat = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [message, loading] = useCollectionData(collection('messages'));

  const sendMessage = () => {
    collection('messages').add({
      uid: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: 0,
    });
  };

  return (
    <Grid container style={{ height: window.innerHeight - 50 }} justifyContent={'center'}>
      <div
        style={{
          width: '70%',
          height: '80vh',
          border: '1px solid gray',
          overflowY: 'auto',
        }}></div>{' '}
      <Grid container flexDirection={'column'} alignItems={'flex-end'} style={{ width: '70%' }}>
        <TextField
          fullWidth
          variant='outlined'
          maxRows={2}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button variant='outlined' onClick={sendMessage}>
          Отправить
        </Button>
      </Grid>
    </Grid>
  );
};

export default Chat;
