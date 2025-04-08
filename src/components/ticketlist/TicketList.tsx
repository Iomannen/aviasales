import { FC, useEffect, useState } from 'react';
import { TicketComponent } from './ticket/Ticket';
import { useSelector } from 'react-redux';
import { Ticket, RenderState } from '../../types/types.ts';
import style from '../../style/ticketList.module.css';
import store from '../../storage/storage.ts';
import { Loading } from '../spinner/Loading.tsx';
import { ButtonComponent } from '../button/Button.tsx';
import { AlertComponent } from '../alert/AlertComponent.tsx';

type RootState = ReturnType<typeof store.getState>;

export const TicketList: FC = () => {
  const [renderState, setRenderState] = useState<RenderState>('LOADING');

  const render = useSelector((state: RootState) => state.tickets.render);
  const allTickets = useSelector((state: RootState) => state.tickets.value);

  useEffect(() => {
    const value =
      render.length !== 0 && allTickets.length !== 0
        ? 'RENDER'
        : render.length === 0 && allTickets.length === 0
          ? 'LOADING'
          : 'ALERT';
    setRenderState(value);
  }, [render]);

  return (
    <div className={style.ticketlist}>
      {renderState === 'RENDER' ? (
        render.map((ticket: Ticket, index: number) => (
          <TicketComponent ticket={ticket} key={`Ticket${index}`} />
        ))
      ) : renderState === 'LOADING' ? (
        <Loading />
      ) : (
        <AlertComponent />
      )}
      <div>{renderState === 'RENDER' ? <ButtonComponent /> : ''}</div>
    </div>
  );
};
