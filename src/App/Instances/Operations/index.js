import React, {useEffect} from 'react';
import {useStore} from 'effector-react';
import {createStoreObject} from 'effector';

import classNames from './index.module.scss';
import {operations$, fetchOperations, isLoading$} from '../../../stores/operations';

const store = createStoreObject({
  operations: operations$,
  isLoading: isLoading$,
});

function Operations() {
  const {operations, isLoading} = useStore(store);

  useEffect(() => {
    fetchOperations();
  }, []);

  return isLoading ? (
    'loading'
  ) : (
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
}

export {Operations};
