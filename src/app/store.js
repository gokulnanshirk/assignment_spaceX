import { configureStore } from '@reduxjs/toolkit';
import launchReducer from '../features/spaceX/launchSlice'
export default configureStore({
  reducer: {
    launches:launchReducer
  },
});
