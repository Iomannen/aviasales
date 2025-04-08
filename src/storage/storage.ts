import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TicketState } from '../types/types';

const initialState: TicketState = {
  connectionsSort: [],
  flightsSort: 'Cheapest',
  renderTickets: 5,
  value: [],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    removeFilter: (state, action) => {
      const index = state.connectionsSort.indexOf(action.payload);
      state.connectionsSort.splice(index, 1);
    },
    addFilter: (state, action) => {
      state.connectionsSort.push(action.payload);
    },
    showMoreTickets: (state) => {
      state.renderTickets = state.renderTickets + 5;
    },
    setFlightsSort: (state, action) => {
      state.flightsSort = action.payload;
    },
    fillTickets: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { actions: ticketActions, reducer: ticketReducer } = ticketSlice;
export default configureStore({
  reducer: { tickets: ticketSlice.reducer },
});
