import RenameChannelModal from './renameChannelModal';
import RemoveChannelModal from './removeChannelModal';
import CreateChannelModal from './createChannelModal';

const modals = {
  add: CreateChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

export default (modalName) => modals[modalName];
