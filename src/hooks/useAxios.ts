import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../storage/storage';
export interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
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
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
  ];
}
export const useRerender = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ticketActions.fillTickets([]));
  }, []);
};

export const useAxios = () => {
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const stopRef = useRef(false);
  useEffect(() => {
    const callback = async () => {
      const getSearchId = await axios.get(
        'https://aviasales-test-api.kata.academy/search',
      );
      while (!stopRef.current) {
        try {
          const getTickets = await axios.get(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${getSearchId.data.searchId}`,
          );
          stopRef.current = getTickets.data.stop;
          setTickets((prev) => [...prev, ...getTickets.data.tickets]);
        } catch (e) {
          console.log(e);
        }
      }
    };
    callback();
  }, []);
  useEffect(() => {
    const priceSorted = tickets.sort((a, b) => a.price - b.price);
    dispatch(ticketActions.fillTickets(priceSorted));
    dispatch(ticketActions.setRenderTickets());
  }, [stopRef.current]);
};
