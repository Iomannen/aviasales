import { FC } from 'react';
import style from '../../../style/ticketList.module.css';
import logo from '../../../assets/s7_logo.png';
import { Ticket } from '../../../hooks/useAxios';
import { useTicketInfo } from '../../../hooks/useTicketInfo';
interface Props {
  ticket: Ticket;
}
export const TicketComponent: FC<Props> = (props) => {
  const { ticket } = props;
  const ticketInfo = useTicketInfo(ticket);
  return (
    <div className={style.background}>
      <div className={style.header}>
        <div className={style.price}>{ticketInfo.price}</div>
        <img src={logo} className={style.logo}></img>
      </div>
      <div className={style.flights}>
        <div className={style.flight_info}>
          <div className={style.info_component} key={1}>
            <div className={style.grey}>{ticketInfo.to.flight}</div>
            <div className={style.black}>{ticketInfo.to.flight_time}</div>
          </div>
          <div className={style.info_component} key={2}>
            <div className={style.grey}>В ПУТИ</div>
            <div className={style.black}>{ticketInfo.to.duration}</div>
          </div>
          <div className={style.info_component} key={3}>
            <div className={style.grey}>{ticketInfo.to.transits_number}</div>
            <div className={style.black}>{ticketInfo.to.transits}</div>
          </div>
        </div>
        <div className={style.flight_info}>
          <div className={style.info_component} key={1}>
            <div className={style.grey}>{ticketInfo.from.flight}</div>
            <div className={style.black}>{ticketInfo.from.flight_time}</div>
          </div>
          <div className={style.info_component} key={2}>
            <div className={style.grey}>В ПУТИ</div>
            <div className={style.black}>{ticketInfo.from.duration}</div>
          </div>
          <div className={style.info_component} key={3}>
            <div className={style.grey}>{ticketInfo.from.transits_number}</div>
            <div className={style.black}>{ticketInfo.from.transits}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
