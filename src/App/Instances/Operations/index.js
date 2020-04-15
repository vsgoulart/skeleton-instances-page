import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import classNames from './index.module.scss';
import {toJS} from 'mobx';

import {fetchOperations} from '../../api';
import {useStores} from '../../../hooks/useStores';
import useOperationsPolling from '../../../hooks/useOperationsPolling';

const Operations = observer(() => {
  const {operationsStore} = useStores();
  const {operations} = operationsStore.state;
  const {start, stop} = useOperationsPolling();

  // toJS can be used to turn the Mobx proxy object into a plain JS object
  console.log(toJS(operations));

  useEffect(() => {
    if (operations.some(operation => !operation.endDate)) {
      // start polling everytime we fetch a running operation
      start(fetchOperations);
    } else {
      stop();
    }
  }, [operations, start, stop]);

  useEffect(() => {
    // fetch and store operations initially
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
