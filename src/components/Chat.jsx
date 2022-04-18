import { Button, Grid, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';

import { Context } from '..';
import Loader from './Loader';
import Message from './Message';

const Chat = () => {
  const [value, setValue] = useState('');
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);

  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createAt'));
  const [messages, loading] = useCollectionData(q);

  const sendMessage = async () => {
    if (value) {
      addDoc(messagesRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createAt: serverTimestamp(),
      });
      setValue('');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container style={{ height: window.innerHeight - 50 }} justifyContent={'center'}>
      <div
        style={{
          width: '70%',
          height: '80vh',
          background: '#fff',
          overflowY: 'auto',
          borderRadius: ' 0 0 20px 20px',
        }}>
        {messages && <Message messages={messages} user={user} />}
      </div>
      <Grid
        container
        gap={'1rem'}
        flexDirection={'row'}
        wrap={'nowrap'}
        alignItems={'center'}
        style={{ width: '70%', marginTop: 10 }}>
        <TextField
          fullWidth
          variant='standard'
          maxRows={2}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          variant='outlined'
          onClick={sendMessage}
          style={{
            color: '#000',
            borderColor: '#000',
          }}>
          Отправить
        </Button>
      </Grid>
    </Grid>
  );
};

export default Chat;
