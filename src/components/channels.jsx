import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeChannel,
  selectors,
} from '../slices/channelsSlice';

function Channels() {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex flex-column"
    >

      <h2
        className="h4 px-3 mb-3"
      >
        Каналы
      </h2>

      <Nav
        as="ul"
        fill
        variant="pills"
        className="flex-column"
      >

        {channels.map((channel) => (
          <Nav.Item
            as="li"
            className="w-100"
          >

            <Button
              variant={channel.id === currentChannelId ? 'secondary' : 'none'}
              onClick={() => dispatch(changeChannel(channel.id))}
              className="w-100 rounded-0 text-start px-3"
            >
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default Channels;
