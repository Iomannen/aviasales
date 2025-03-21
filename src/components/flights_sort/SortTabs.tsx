import { FC } from 'react';
import { Radio, ConfigProvider } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import style from '../../style/style.module.css';
import { useSelector } from 'react-redux';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'Cheapest' },
  { label: 'САМЫЙ БЫСТРЫЙ', value: 'Fastest' },
  { label: 'ОПТИМАЛЬНЫЙ', value: 'Optimal' },
];

export const SortTabs: FC = () => {
  const tickets = useSelector((state) => state.tickets.value);
  const render = useSelector((state) => state.tickets.render);
  const handleTabs = () => {
    console.log(tickets);
    console.log(render);
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
