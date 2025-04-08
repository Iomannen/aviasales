import store from '../storage/storage.ts';

export interface TicketState {
  connectionsSort: string[];
  flightsSort: string;
  renderTickets: number;
  value: Array<Ticket>;
}

export interface Segment {
  // Код города (iata)
  origin: string;
  // Код города (iata)
  destination: string;
  // Дата и время вылета туда
  date: string;
  // Массив кодов (iata) городов с пересадками
  stops: string[];
  // Общее время перелёта в минутах
  duration: number;
}

export interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: Array<Segment>;
}

export type RenderState = 'LOADING' | 'ALERT' | 'RENDER';

export type RootState = ReturnType<typeof store.getState>;
