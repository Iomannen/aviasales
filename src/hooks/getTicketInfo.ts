import { addMinutes, parseISO, format, intervalToDuration } from 'date-fns';
import { Ticket, Segment } from '../types/types';

export const getTicketInfo = (ticket: Ticket) => {
  const formatSegmentInfo = (segment: Segment) => {
    const formattedDate = parseISO(segment.date);
    const arriveDate = addMinutes(formattedDate, segment.duration);
    const duration = intervalToDuration({
      start: new Date(0),
      end: new Date(segment.duration * 60 * 1000),
    });

    return {
      flight: `${segment.origin} - ${segment.destination} `,
      flight_time: `${format(segment.date, 'HH:mm')} - ${format(arriveDate, 'HH:mm')}`,
      duration: `${duration.hours}ч ${duration.minutes !== undefined ? `${duration.minutes}м` : ''}`,
      transits_number:
        segment.stops.length === 0
          ? `НЕТ ПЕРЕСАДОК`
          : segment.stops.length === 1
            ? `1 ПЕРЕСАДКА`
            : `${segment.stops.length} ПЕРЕСАДКИ`,
      transits: segment.stops.join(', '),
    };
  };

  const info = {
    price: `${ticket.price.toLocaleString('ru-RU')} P`,
    to: formatSegmentInfo(ticket.segments[0]),
    from: formatSegmentInfo(ticket.segments[1]),
  };

  return info;
};
