import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../hooks/useAxios';
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
    flightsSort: 'Cheapest',
    renderTickets: 5,
    value: [],
    render: [],
  },

  reducers: {
    setFlightsSort: (state, action) => {
      state.flightsSort = action.payload;
    },

    fillTickets: (state, action) => {
      switch (state.flightsSort) {
        case 'Cheapest':
          state.value = action.payload;
          break;
        case 'Fastest':
          state.value = action.payload.sort(
            (a: Ticket, b: Ticket) =>
              a.segments[0].duration - b.segments[0].duration,
          );
          break;
        case 'Optimal':
          state.value = action.payload;
          break;
        default:
          state.value = action.payload;
      }
    },
    setRenderTickets: (state) => {
      switch (state.flightsSort) {
        case 'Cheapest':
          state.value = [...state.value].sort(
            (a: Ticket, b: Ticket) => a.price - b.price,
          );
          break;
        case 'Fastest':
          state.value = [...state.value].sort(
            (a: Ticket, b: Ticket) =>
              a.segments[0].duration - b.segments[0].duration,
          );
          break;
        case 'Optimal':
          state.value = [...state.value];
          break;
        default:
          state.value = [...state.value];
      }
      state.render = state.value.slice(0, state.renderTickets);
    },
  },
});

export const { actions: ticketActions, reducer: ticketReducer } = ticketSlice;
export default configureStore({
  reducer: { tickets: ticketSlice.reducer, loading: loadingSlice.reducer },
});
