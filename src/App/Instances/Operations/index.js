import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import classNames from './index.module.scss';

import {fetchOperations} from '../../api';
import {useStores} from '../../../hooks/useStores';

const Operations = observer(() => {
  const {operationsStore} = useStores();
  const {operations} = operationsStore.state;

  useEffect(() => {
    const loadOperations = async () => {
      operationsStore.setOperations(await fetchOperations());
    };
    loadOperations();
  }, [operationsStore]);

  return (
    <div className={classNames.operations}>
      <h2>Operations</h2>
      {operations.map(({id, startDate, endDate, operationsFinishedCount, operationsTotalCount}) => (
        <div key={id} className={classNames.operation}>
          <div>{id}</div>
          <div>{startDate}</div>
          <div>{endDate || '-'}</div>
          <div>{`${operationsFinishedCount} / ${operationsTotalCount}`}</div>
        </div>
      ))}
    </div>
  );
});

export {Operations};
