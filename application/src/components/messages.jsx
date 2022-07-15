import React from 'react';
import MessagesHeader from './messagesHeader';
import MessagesBody from './messagesBody';
import MessagesForm from './messagesForm';

function Messages() {
  return (
    <div
      className="d-flex flex-column h-100"
    >

      <MessagesHeader />
      <MessagesBody />
      <MessagesForm />
    </div>
  );
}

export default Messages;
