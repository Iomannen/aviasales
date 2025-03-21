import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: true,
  },
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    renderTickets: 5,
    value: [],
    render: [],
  },
  reducers: {
    fillTickets: (state, action) => {
      state.value = action.payload;
    },
    setRenderTickets: (state) => {
      state.render = state.value.slice(0, state.renderTickets);
    },
  },
});

export const { actions: ticketActions, reducer: ticketReducer } = ticketSlice;
export default configureStore({
  reducer: { tickets: ticketSlice.reducer, loading: loadingSlice.reducer },
});
