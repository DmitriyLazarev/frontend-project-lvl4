import React from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  changeChannel,
  selectors,
} from '../slices/channelsSlice';
import ChannelActionsModals from './modals/channelActionsModals';
import { openModal } from '../slices/modalSlice';

function ChannelsItem(props) {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const { channel, currentChannelId } = props;
  const { id, name } = channel;
  const dispatch = useDispatch();

  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
    >

      <Button
        variant={id === currentChannelId ? 'secondary' : 'none'}
        onClick={() => dispatch(changeChannel(id))}
        title={name}
        className="w-100 rounded-0 text-start px-3 text-truncate"
      >
        #
        {' '}
        {name}
      </Button>

      {channel.removable ? (
        <>
          <Dropdown.Toggle
            variant={id === currentChannelId ? 'secondary' : 'none'}
            className="flex-grow-0"
            aria-expanded="false"
          >
            <span className="visually-hidden">{t('control')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item
              onClick={() => dispatch(openModal({
                type: 'renaming',
                item: channel,
              }))}
            >
              {t('rename')}
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => dispatch(openModal({
                type: 'removing',
                item: channel,
              }))}
            >
              {t('remove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      ) : null}
    </Dropdown>
  );
}

function Channels() {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex flex-column h-100"
    >

      <div
        className="d-flex justify-content-between px-3 mb-3"
      >

        <h2
          className="h4 m-0"
        >
          {t('title')}
        </h2>

        <Button
          className="d-flex align-items-center"
          variant="outline-primary"
          size="sm"
          onClick={() => dispatch(openModal({
            type: 'add',
            item: null,
          }))}
        >
          {t('createButtonShort')}
        </Button>
      </div>

      <Nav
        as="ul"
        fill
        variant="pills"
        className="flex-column overflow-auto flex-grow-1 flex-nowrap"
      >

        {channels.map((channel) => (
          <Nav.Item
            as="li"
            key={channel.id}
            className="w-100 flex-grow-0 flex-shrink-0 w-100"
          >

            <ChannelsItem
              channel={channel}
              currentChannelId={currentChannelId}
            />
          </Nav.Item>
        ))}
      </Nav>

      <ChannelActionsModals />
    </div>
  );
}

export default Channels;
