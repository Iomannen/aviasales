import { FC } from 'react';
import { TicketComponent } from './ticket/Ticket';
import { useSelector } from 'react-redux';
import { Ticket } from '../../types/types.ts';
import style from '../../style/ticketList.module.css';
import store from '../../storage/storage.ts';
import { Loading } from '../spinner/Loading.tsx';
import { ButtonComponent } from '../button/Button.tsx';

type RootState = ReturnType<typeof store.getState>;

export const TicketList: FC = () => {
  
  const render = useSelector((state: RootState) => state.tickets.render);
  return (
    <div className={style.ticketlist}>
      {render.length !== 0 ? (
        render.map((ticket: Ticket, index: number) => (
          <TicketComponent ticket={ticket} key={`Ticket${index}`} />
        ))
      ) : (
        <Loading />
      )}
      <div> {render.length !== 0 ? <ButtonComponent /> : ''}</div>
    </div>
  );
};
