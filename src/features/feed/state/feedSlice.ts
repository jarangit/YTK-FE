import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FeedState {
  query: string;
  selectedItemId: string | null;
}

const initialState: FeedState = {
  query: '',
  selectedItemId: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    selectFeedItem(state, action: PayloadAction<string>) {
      state.selectedItemId = action.payload;
    },
    clearSelectedFeedItem(state) {
      state.selectedItemId = null;
    },
  },
});

export const { setFeedQuery, selectFeedItem, clearSelectedFeedItem } = feedSlice.actions;
export default feedSlice.reducer;
