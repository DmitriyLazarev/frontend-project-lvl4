import React, { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import CharContext from '../contexts/chatContext';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice';

function ChapProvider({ children }) {
  const dispatch = useDispatch();
  const socket = io();
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel.id));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }));
    });
  }, [dispatch, socket]);
  const sendNewMessage = useCallback((message, responseHandle) => {
    socket.emit('newMessage', message, (response) => {
      responseHandle(response);
    });
  }, [socket]);
  const addNewChannel = useCallback((channelData, responseHandle) => {
    socket.emit('newChannel', channelData, (response) => {
      responseHandle(response);
    });
  }, [socket]);
  const removeCurrentChannel = useCallback((channel, responseHandle) => {
    socket.emit('removeChannel', channel, (response) => {
      responseHandle(response);
    });
  }, [socket]);
  const renameCurrentChannel = useCallback((data, responseHandle) => {
    socket.emit('renameChannel', data, (response) => {
      responseHandle(response);
    });
  }, [socket]);

  const value = React.useMemo(() => ({
    sendNewMessage, addNewChannel, removeCurrentChannel, renameCurrentChannel,
  }), [sendNewMessage, addNewChannel, removeCurrentChannel, renameCurrentChannel]);

  return (
    <CharContext.Provider
      value={value}
    >
      {children}
    </CharContext.Provider>
  );
}
export default ChapProvider;
