import React from 'react';

import classNames from './index.module.scss';
import {OPERATIONS} from './mocks';

function Operations() {
  return (
    <div className={classNames.operations}>
      <h2>Operations</h2>
      {OPERATIONS.map(({id, startDate, endDate, operationsFinishedCount, operationsTotalCount}) => (
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
