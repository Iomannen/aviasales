import { FC } from 'react';
import { Radio, ConfigProvider } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import style from '../../style/style.module.css';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'Самый дешевый' },
  { label: 'САМЫЙ БЫСТРЫЙ', value: 'Самый быстрый' },
  { label: 'ОПТИМАЛЬНЫЙ', value: 'Оптимальный' },
];
export const SortTabs: FC = () => {
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
        defaultValue="Самый дешевый"
        optionType="button"
        buttonStyle="solid"
        className={style.tabs}
      />
    </ConfigProvider>
  );
};
