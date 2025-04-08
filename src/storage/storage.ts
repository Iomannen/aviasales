import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Ticket, TicketState } from '../types/types';

const initialState: TicketState = {
  connectionsSort: [],
  flightsSort: 'Cheapest',
  renderTickets: 5,
  sorted: [],
  connectionSorted: [],
  value: [],
  render: [],
  cheapest: [],
  fastest: [],
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
    setRenderTickets: (state) => {
      state.connectionsSort.forEach((filter) => {
        switch (filter) {
          case 'All':
            state.connectionSorted = [...state.value];
            break;
          case '0':
            state.sorted = state.value.filter(
              (ticket: Ticket) =>
                ticket.segments[0].stops.length === 0 &&
                ticket.segments[1].stops.length === 0,
            );
            state.connectionSorted.push(...state.sorted);
            break;
          case '1':
            state.sorted = state.value.filter(
              (ticket: Ticket) =>
                ticket.segments[0].stops.length === 1 &&
                ticket.segments[1].stops.length === 1,
            );
            state.connectionSorted.push(...state.sorted);
            break;
          case '2':
            state.sorted = state.value.filter(
              (ticket: Ticket) =>
                ticket.segments[0].stops.length === 2 &&
                ticket.segments[1].stops.length === 2,
            );
            state.connectionSorted.push(...state.sorted);
            break;
          case '3':
            state.sorted = state.value.filter(
              (ticket: Ticket) =>
                ticket.segments[0].stops.length === 3 &&
                ticket.segments[1].stops.length === 3,
            );
            state.connectionSorted.push(...state.sorted);
            break;
          default:
            state.connectionSorted = [...state.value];
        }
      });
      state.sorted = [...state.connectionSorted];
      state.connectionSorted = [];
      switch (state.flightsSort) {
        case 'Cheapest':
          state.sorted = [...state.sorted].sort(
            (a: Ticket, b: Ticket) => a.price - b.price,
          );
          break;
        case 'Fastest':
          state.sorted = [...state.sorted].sort(
            (a: Ticket, b: Ticket) =>
              a.segments[0].duration - b.segments[0].duration,
          );
          break;
        case 'Optimal':
          state.sorted = [...state.sorted].sort(
            (a: Ticket, b: Ticket) =>
              (200000 - b.price) / b.segments[0].duration -
              (200000 - a.price) / a.segments[0].duration,
          ); // просто сам придумал коэфициент 200 000 ничего не значит (просто число должно быть больше чем самый дорогой возможный билет условно)
          break;
      }
      state.render = state.sorted.slice(0, state.renderTickets);
    },
  },
});

export const { actions: ticketActions, reducer: ticketReducer } = ticketSlice;
export default configureStore({
  reducer: { tickets: ticketSlice.reducer },
});
