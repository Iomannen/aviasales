import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../storage/storage';
import { Ticket } from '../types/types';

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
  }, [stopRef.current]);
};
