import { createSelector } from 'reselect';
import { RootState } from '../types/types.ts';
import { Ticket } from '../types/types';

const getTickets = (state: RootState) => state.tickets.value;

const getFilters = (state: RootState) => state.tickets.connectionsSort;

const getSortType = (state: RootState) => state.tickets.flightsSort;

const getRenderCount = (state: RootState) => state.tickets.renderTickets;

export const getFilteredTickets = createSelector(
  [getTickets, getFilters],
  (tickets, filters) => {
    if (filters.includes('All')) return tickets;
    if (filters.length === 0) return [];
    return tickets.filter((ticket: Ticket) =>
      filters.some((filter) => {
        const stops = Number(filter);
        return (
          ticket.segments[0].stops.length === stops &&
          ticket.segments[1].stops.length === stops
        );
      }),
    );
  },
);

export const getSortedTickets = createSelector(
  [getFilteredTickets, getSortType],
  (tickets, sortType) => {
    switch (sortType) {
      case 'Cheapest':
        return [...tickets].sort((a, b) => a.price - b.price);
      case 'Fastest':
        return [...tickets].sort(
          (a, b) => a.segments[0].duration - b.segments[0].duration,
        );
      case 'Optimal':
        return [...tickets].sort(
          (a, b) =>
            (200000 - b.price) / b.segments[0].duration -
            (200000 - a.price) / a.segments[0].duration,
        ); // рандомный придуманный мной коэфициент (200 000 тут рандом число большее чем стоимость самого дорого билета)
      default:
        return tickets;
    }
  },
);

export const getVisibleTickets = createSelector(
  [getSortedTickets, getRenderCount],
  (tickets, count) => tickets.slice(0, count),
);
