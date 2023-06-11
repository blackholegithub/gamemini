import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userProps{
  name: string | null;
  level: string | null;
}

interface DataState {
  user: userProps,
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  user: {
    name: null,
    level: null
  },
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUser: (state, action: PayloadAction<userProps>) => {
      state.user = action.payload;
    },
  },
});

export const { startLoading, fetchDataSuccess, fetchDataFailure,fetchUser } = dataSlice.actions;

export default dataSlice.reducer;
