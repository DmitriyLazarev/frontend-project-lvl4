import RenameChannelModal from './renameChannelModal';
import RemoveChannelModal from './removeChannelModal';

const modals = {
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

export default (modalName) => modals[modalName];
