import { useSelector } from 'react-redux';
import React from 'react';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

function MessagesHeader() {
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter((item) => item.channelId === currentChannelId);

  return (
    <div
      className="bg-light py-4 px-3 shadow-sm small"
    >

      <p
        className="m-0"
      >
        <b>
          #
          {currentChannel ? currentChannel.name : null}
        </b>
      </p>

      <span
        className="text-muted"
      >
        {currentChannelMessages.length}
        {' '}
        сообщения
      </span>
    </div>
  );
}

export default MessagesHeader;
