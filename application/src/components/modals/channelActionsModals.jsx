import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index';

function ChannelActionsModals() {
  const currentModalType = useSelector((state) => state.modals.type);
  const CurrentModal = getModal(currentModalType);
  if (!CurrentModal) {
    return null;
  }
  return (
    <CurrentModal />
  );
}
export default ChannelActionsModals;
