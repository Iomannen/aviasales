import { FC } from 'react';
import { Checkbox, ConfigProvider } from 'antd';
import style from '../../style/style.module.css';
import '@ant-design/v5-patch-for-react-19';
export const ConnectionsSort: FC = () => {
  return (
    <div className={`${style.sortWindow} ${style.background}`}>
      <div className={style.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <div className={style.checkboxes}>
        <ConfigProvider
          theme={{
            token: {
              borderRadiusSM: 2,
              controlInteractiveSize: 20,
            },
          }}
        >
          <Checkbox className={style.checkbox}>Все</Checkbox>
          <Checkbox className={style.checkbox}>Без пересадок</Checkbox>
          <Checkbox className={style.checkbox}>1 пересадка</Checkbox>
          <Checkbox className={style.checkbox}>2 пересадки</Checkbox>
          <Checkbox className={style.checkbox}>3 пересадки</Checkbox>
        </ConfigProvider>
      </div>
    </div>
  );
};
