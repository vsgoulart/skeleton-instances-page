import {useRef} from 'react';

import {fetchOperations, fetchWorkflowInstances, fetchStatistics} from '../App/api';
import {useStores} from './useStores';

const usePolling = () => {
  const intervalId = useRef(null);
  const {operationsStore, instancesStore, filterStore, statisticsStore} = useStores();

  const start = () => {
    if (intervalId.current) return;

    console.log('polling started');

    intervalId.current = setInterval(async () => {
      console.log('polling...');
      const [operations, instances, count] = await Promise.all([
        fetchOperations(),
        fetchWorkflowInstances(filterStore.searchParams),
        fetchStatistics(),
      ]);

      operationsStore.setOperations(operations);
      instancesStore.setInstances(instances);
      statisticsStore.setCount(count);
    }, 3000);
  };

  const stop = () => {
    if (!intervalId.current) return;

    console.log('polling stopped');

    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  return {start, stop};
};

export default usePolling;
