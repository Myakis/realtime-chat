import { Avatar, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Message = ({ messages, user }) => {
  return (
    <>
      {messages.map((message, i) => (
        <div
          key={i}
          style={{
            margin: 10,
            marginLeft: user.uid === message.uid ? 'auto' : '10px',
            width: 'fit-content',
          }}>
          <Grid
            container
            alignItems={'center'}
            style={{
              justifyContent: user.uid === message.uid ? 'flex-end' : 'flex-start',
              flexDirection: user.uid === message.uid ? 'row-reverse' : 'row',
              gap: ' 0.5rem',
            }}>
            <Avatar src={message.photoURL}></Avatar>
            <Box>{message.displayName}</Box>
          </Grid>
          <Box marginY={'5px'}>{message.text}</Box>
        </div>
      ))}
    </>
  );
};

export default Message;
