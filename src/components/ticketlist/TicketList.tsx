import { FC } from 'react';
import { TicketComponent } from './ticket/Ticket';
import { useSelector } from 'react-redux';
import { Ticket } from '../../hooks/useAxios';
import style from '../../style/ticketList.module.css';
export const TicketList: FC = () => {
  const render = useSelector((state) => state.tickets.render);
  return (
    <div className={style.ticketlist}>
      {render.length !== 0
        ? render.map((ticket: Ticket, index: number) => (
            <TicketComponent ticket={ticket} key={`Ticket${index}`} />
          ))
        : ''}
    </div>
  );
};
