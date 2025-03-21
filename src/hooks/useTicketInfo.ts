import { addMinutes, parseISO, format } from 'date-fns';
interface Ticket {
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
export const useTicketInfo = (ticket: Ticket) => {
  // Разбираем сегмент отвечающий за первый полет
  const formatedDateTo = parseISO(ticket.segments[0].date);
  const arriveDateTo = addMinutes(formatedDateTo, ticket.segments[0].duration);
  const durationTo = format(ticket.segments[0].duration * 60 * 1000, 'HH:mm');
  // Общее время перелёта в минутах
  const formatedDateBack = parseISO(ticket.segments[1].date);
  const arriveDateBack = addMinutes(
    formatedDateBack,
    ticket.segments[1].duration,
  );
  const durationBack = format(ticket.segments[1].duration * 60 * 1000, 'HH:mm');
  const info = {
    price: ticket.price,
    to: {
      flight: `${ticket.segments[0].origin} - ${ticket.segments[0].destination} `,
      flight_time: `${format(ticket.segments[0].date, 'HH:mm')} - ${format(arriveDateTo, 'HH:mm')}`,
      duration: durationTo,
      transits_number:
        ticket.segments[0].stops.length === 0
          ? `Нет пересадок`
          : ticket.segments[0].stops.length === 1
            ? `1 пересадка`
            : `${ticket.segments[0].stops.length} пересадки`,
      transits: ticket.segments[0].stops.join(' ,'),
    },
    from: {
      flight: `${ticket.segments[1].origin} - ${ticket.segments[1].destination} `,
      flight_time: `${format(ticket.segments[1].date, 'HH:mm')} - ${format(arriveDateBack, 'HH:mm')}`,
      duration: durationBack,
      transits_number:
        ticket.segments[1].stops.length === 0
          ? `Нет пересадок`
          : ticket.segments[1].stops.length === 1
            ? `1 пересадка`
            : `${ticket.segments[1].stops.length} пересадки`,
      transits: ticket.segments[1].stops.join(' ,'),
    },
  };
  return info;
};
