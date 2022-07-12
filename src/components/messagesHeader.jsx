import { useSelector } from 'react-redux';
import React from 'react';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

function MessagesHeader() {
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelData = channels.filter((item) => item.id === currentChannelId)[0];

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter((item) => item.channelId === currentChannelId);

  return (
    <div
      className="bg-light mb-4 py-4 px-3 shadow-sm small"
    >

      <p
        className="m-0"
      >
        <b>
          #
          {currentChannelData.name}
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
