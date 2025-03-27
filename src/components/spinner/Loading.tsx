import { FC } from 'react';
import { Spin } from 'antd';
import style from '../../style/ticketList.module.css';

export const Loading: FC = () => {
  return <Spin className={style.spin} size="large"></Spin>;
};
