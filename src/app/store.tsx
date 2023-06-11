import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import submitSlice from './submitSlice';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      data: dataSlice,
      submit: submitSlice,
      // Thêm các reducers khác vào đây nếu có
    },
  });

  return store;
};

const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
