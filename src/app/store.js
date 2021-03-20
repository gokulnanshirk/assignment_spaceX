import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import launchReducer from '../features/spaceX/launchSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    launches:launchReducer
  },
});
