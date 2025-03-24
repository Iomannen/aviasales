import { FC } from 'react';
import { Button } from 'antd';
import style from '../../style/style.module.css';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../../storage/storage';
export const ButtonComponent: FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ticketActions.showMoreTickets());
    dispatch(ticketActions.setRenderTickets());
  };
  return (
    <Button type="primary" className={style.button} onClick={handleClick}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </Button>
  );
};
