import { FC, useEffect, useState } from 'react';
import { TicketComponent } from './ticket/Ticket';
import { useSelector } from 'react-redux';
import { Ticket, RenderState, RootState } from '../../types/types.ts';
import style from '../../style/ticketList.module.css';
import { Loading } from '../spinner/Loading.tsx';
import { ButtonComponent } from '../button/Button.tsx';
import { AlertComponent } from '../alert/AlertComponent.tsx';
import { getVisibleTickets } from '../../selectors/ticketSelectors.ts';

export const TicketList: FC = () => {
  const [renderState, setRenderState] = useState<RenderState>('LOADING');

  const visibleTickets = useSelector(getVisibleTickets);
  const allTickets = useSelector((state: RootState) => state.tickets.value);

  useEffect(() => {
    const value =
      visibleTickets.length !== 0 && allTickets.length !== 0
        ? 'RENDER'
        : visibleTickets.length === 0 && allTickets.length === 0
          ? 'LOADING'
          : 'ALERT';
    setRenderState(value);
  }, [visibleTickets]);

  return (
    <div className={style.ticketlist}>
      {renderState === 'RENDER' ? (
        visibleTickets.map((ticket: Ticket, index: number) => (
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
