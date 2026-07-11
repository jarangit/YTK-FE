import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FeedState {
  query: string;
}

const initialState: FeedState = {
  query: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setFeedQuery } = feedSlice.actions;
export default feedSlice.reducer;
