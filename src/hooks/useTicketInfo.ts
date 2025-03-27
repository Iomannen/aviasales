import { addMinutes, parseISO, format, intervalToDuration } from 'date-fns';
import { Ticket } from '../types/types';

export const useTicketInfo = (ticket: Ticket) => {
  // Разбираем сегмент отвечающий за первый полет
  const formatedDateTo = parseISO(ticket.segments[0].date);
  const arriveDateTo = addMinutes(formatedDateTo, ticket.segments[0].duration);
  const durationTo = intervalToDuration({
    start: new Date(0),
    end: new Date(ticket.segments[0].duration * 60 * 1000),
  });
  // Общее время перелёта в минутах
  const formatedDateBack = parseISO(ticket.segments[1].date);
  const arriveDateBack = addMinutes(
    formatedDateBack,
    ticket.segments[1].duration,
  );
  const durationBack = intervalToDuration({
    start: new Date(0),
    end: new Date(ticket.segments[1].duration * 60 * 1000),
  });
  const info = {
    price: `${ticket.price.toLocaleString('ru-RU')} P`,
    to: {
      flight: `${ticket.segments[0].origin} - ${ticket.segments[0].destination} `,
      flight_time: `${format(ticket.segments[0].date, 'HH:mm')} - ${format(arriveDateTo, 'HH:mm')}`,
      duration: `${durationTo.hours}ч ${durationTo.minutes !== undefined ? `${durationTo.minutes}м` : ''}`,
      transits_number:
        ticket.segments[0].stops.length === 0
          ? `НЕТ ПЕРЕСАДОК`
          : ticket.segments[0].stops.length === 1
            ? `1 ПЕРЕСАДКА`
            : `${ticket.segments[0].stops.length} ПЕРЕСАДКИ`,
      transits: ticket.segments[0].stops.join(', '),
    },
    from: {
      flight: `${ticket.segments[1].origin} - ${ticket.segments[1].destination} `,
      flight_time: `${format(ticket.segments[1].date, 'HH:mm')} - ${format(arriveDateBack, 'HH:mm')}`,
      duration: `${durationBack.hours}ч ${durationBack.minutes !== undefined ? `${durationBack.minutes}м` : ''}`,
      transits_number:
        ticket.segments[1].stops.length === 0
          ? `НЕТ ПЕРЕСАДОК`
          : ticket.segments[1].stops.length === 1
            ? `1 ПЕРЕСАДКА`
            : `${ticket.segments[1].stops.length} ПЕРЕСАДКИ`,
      transits: ticket.segments[1].stops.join(', '),
    },
  };
  return info;
};
