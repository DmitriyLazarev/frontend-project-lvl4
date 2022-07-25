import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async (options = {}) => {
    const response = await axios.get(routes.dataPath(), options);
    return response.data;
  },
);

export default fetchData;
