import { FC, JSX, useEffect, useState } from 'react';
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

  const getRender = (): JSX.Element | JSX.Element[] => {
    switch (renderState) {
      case 'RENDER':
        return visibleTickets.map((ticket: Ticket, index: number) => (
          <TicketComponent ticket={ticket} key={`Ticket${index}`} />
        ));
      case 'LOADING':
        return <Loading />;
      case 'ALERT':
        return <AlertComponent />;
    }
  };

  return (
    <div className={style.ticketlist}>
      {getRender()}
      <div>{renderState === 'RENDER' ? <ButtonComponent /> : ''}</div>
    </div>
  );
};
