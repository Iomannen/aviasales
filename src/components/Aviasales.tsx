import { FC } from 'react';
import style from '../style/style.module.css';
import { Logo } from './logo/Logo';
import { ConnectionsSort } from './connections_sort/ConnectionsSort';
import { SortTabs } from './flights_sort/SortTabs';

export const AviaSales: FC = () => {
  /* useEffect(() => {
    let stop = false;
    const callback = async () => {
      const fetch1 = await fetch(
        'https://aviasales-test-api.kata.academy/search',
      );
      const fetch1Response = await fetch1.json();
      console.log(fetch1Response.searchId);
      while (!stop) {
        const fetch2 = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${fetch1Response.searchId}`,
        );
        const fetch2Response = await fetch2.json();
        console.log(fetch2Response);
        stop = fetch2Response.stop;
      }
    };
    callback();
  }, []);
*/
  return (
    <div className={style.main}>
      <Logo />
      <ConnectionsSort />
      <div>
        <SortTabs />
      </div>
    </div>
  );
};
