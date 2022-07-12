import { useContext } from 'react';
import socketContext from '../contexts/chatContext';

const useChatApi = () => useContext(socketContext);

export default useChatApi;
