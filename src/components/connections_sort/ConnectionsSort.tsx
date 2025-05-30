import { FC, useState, useEffect } from 'react';
import { Checkbox, CheckboxChangeEvent, ConfigProvider } from 'antd';
import style from '../../style/style.module.css';
import '@ant-design/v5-patch-for-react-19';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../../storage/storage';
export const ConnectionsSort: FC = () => {
  const [allCheckbox, setCheck] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ticketActions.addFilter('All'));
  }, []);

  const handleCheckbox = (event: CheckboxChangeEvent) => {
    if (event.target.name !== 'All') {
      setCheck(false);
    }
    if (event.target.checked) {
      dispatch(ticketActions.addFilter(event.target.name));
    } else {
      dispatch(ticketActions.removeFilter(event.target.name));
    }
  };

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
          <Checkbox
            className={style.checkbox}
            onChange={handleCheckbox}
            name="All"
            defaultChecked={allCheckbox}
          >
            Все
          </Checkbox>
          <Checkbox
            className={style.checkbox}
            name="0"
            onChange={handleCheckbox}
          >
            Без пересадок
          </Checkbox>
          <Checkbox
            className={style.checkbox}
            onChange={handleCheckbox}
            name="1"
          >
            1 пересадка
          </Checkbox>
          <Checkbox
            className={style.checkbox}
            onChange={handleCheckbox}
            name="2"
          >
            2 пересадки
          </Checkbox>
          <Checkbox
            className={style.checkbox}
            onChange={handleCheckbox}
            name="3"
          >
            3 пересадки
          </Checkbox>
        </ConfigProvider>
      </div>
    </div>
  );
};
