import { FC } from 'react';
import { Alert } from 'antd';

export const AlertComponent: FC = () => {
  return (
    <Alert
      type="info"
      message="Упс..."
      description="Мы не смогли найти билеты по заданным фильтрам"
      showIcon
    />
  );
};
