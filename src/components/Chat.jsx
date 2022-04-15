import { Avatar, Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';

import { Context } from '..';

const Chat = () => {
  const [value, setValue] = useState('');

  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createAt'));
  const [messages] = useCollectionData(q);

  const sendMessage = async () => {
    let i = 0;
    if (value) {
      addDoc(messagesRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createAt: serverTimestamp(),
      });
      i++;
      setValue('');
    }
  };

  return (
    <Grid container style={{ height: window.innerHeight - 50 }} justifyContent={'center'}>
      <div
        style={{
          width: '70%',
          height: '80vh',
          border: '1px solid gray',
          overflowY: 'auto',
        }}>
        {messages &&
          messages.map((message, i) => (
            <div
              key={i}
              style={{
                margin: 10,
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                width: 'fit-content',
              }}>
              <Grid
                container
                style={{
                  justifyContent: user.uid === message.uid ? 'flex-end' : 'flex-start',
                }}>
                <Avatar src={message.photoURL}></Avatar>
                <Box>{message.displayName}</Box>
              </Grid>
              <Box>{message.text}</Box>
            </div>
          ))}
      </div>
      <Grid
        container
        gap={'1rem'}
        flexDirection={'row'}
        wrap={'no-wrap'}
        alignItems={'center'}
        style={{ width: '70%' }}>
        <TextField
          fullWidth
          variant='standard'
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
