import { FC } from 'react';
import logo from '../../assets/Logo.svg';
import style from '../../style/style.module.css';

export const Logo: FC = () => {
  return (
    <div className={style.logowrapper}>
      <img src={logo} className={style.logo}></img>
    </div>
  );
};
