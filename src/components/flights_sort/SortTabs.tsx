import { FC } from 'react';
import { Radio, ConfigProvider, RadioChangeEvent } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import style from '../../style/style.module.css';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../../storage/storage';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'Cheapest' },
  { label: 'САМЫЙ БЫСТРЫЙ', value: 'Fastest' },
  { label: 'ОПТИМАЛЬНЫЙ', value: 'Optimal' },
];

export const SortTabs: FC = () => {
  const dispatch = useDispatch();

  const handleTabs = (event: RadioChangeEvent) => {
    dispatch(ticketActions.setFlightsSort(event.target.value));
  };

  return (
    <ConfigProvider
      theme={{
        token: { controlHeight: 50 },
        components: {
          Radio: {
            buttonPaddingInline: 20,
          },
        },
      }}
    >
      <Radio.Group
        size="middle"
        options={options}
        defaultValue="Cheapest"
        optionType="button"
        buttonStyle="solid"
        className={style.tabs}
        onChange={handleTabs}
      />
    </ConfigProvider>
  );
};
