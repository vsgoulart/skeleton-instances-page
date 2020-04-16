import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import classNames from './index.module.scss';
import {getOperations} from '../../../actions';

export function Operations({operations, getOperations}) {
  useEffect(() => {
    getOperations();
  }, [getOperations]);

  return (
    <div className={classNames.operations}>
      <h2>Operations</h2>
      {operations.map(({id, startDate, endDate, operationsFinishedCount, operationsTotalCount}) => (
        <div data-testid={`operation-${id}`} key={id} className={classNames.operation}>
          <div>{id}</div>
          <div>{startDate}</div>
          <div>{endDate || '-'}</div>
          <div>{`${operationsFinishedCount} / ${operationsTotalCount}`}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    operations: state.operations,
  };
};

export default connect(mapStateToProps, {getOperations})(Operations);
