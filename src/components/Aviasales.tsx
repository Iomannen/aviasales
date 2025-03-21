import { FC } from 'react';
import style from '../style/style.module.css';
import { Logo } from './logo/Logo';
import { ConnectionsSort } from './connections_sort/ConnectionsSort';
import { SortTabs } from './flights_sort/SortTabs';
import { TicketList } from './ticketlist/TicketList';
import { useRerender, useAxios } from '../hooks/useAxios';
export const AviaSales: FC = () => {
  useRerender();
  useAxios();
  return (
    <div className={style.main}>
      <Logo />
      <ConnectionsSort />
      <div>
        <SortTabs />
        <TicketList />
      </div>
    </div>
  );
};
