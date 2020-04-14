import React, {useState, useEffect} from 'react';

import classNames from './index.module.scss';
import {Pagination} from './Pagination';
import {connect} from 'react-redux';
import {withPolling} from '../../Polling/withPolling';
import {POLLING_TYPES} from '../../Polling/constants';

import {
  cancelOperation,
  retryOperation,
  createBatchOperation,
  getWorkflowInstances,
  triggerPolling,
} from '../../../actions';
const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

function Table({
  cancelOperation,
  retryOperation,
  getWorkflowInstances,
  workflowInstances,
  createBatchOperation,
  totalInstanceCount,
  triggerPolling,
  activeInstances,
  isLoading,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [areAllIdsSelected, setAreAllIdsSelected] = useState(false);

  useEffect(() => {
    triggerPolling(POLLING_TYPES.workflowInstances, true);
  }, [triggerPolling]);

  useEffect(() => {
    if (!isLoading && activeInstances && activeInstances.length === 0) {
      triggerPolling(POLLING_TYPES.workflowInstances, false);
      triggerPolling(POLLING_TYPES.batchOperations, false);
      triggerPolling(POLLING_TYPES.statistics, false);
    }
  }, [isLoading, activeInstances, triggerPolling]);

  function onCancel(id) {
    cancelOperation({id: id, type: 'CANCEL_WORKFLOW_INSTANCE'});
    triggerPolling(POLLING_TYPES.workflowInstances, true);
    triggerPolling(POLLING_TYPES.batchOperations, true);
    triggerPolling(POLLING_TYPES.statistics, true);
  }

  function onBatchCancel() {
    createBatchOperation({ids: selectedIds, type: 'CANCEL_WORKFLOW_INSTANCE'});
    triggerPolling(POLLING_TYPES.workflowInstances, true);
    triggerPolling(POLLING_TYPES.batchOperations, true);
    triggerPolling(POLLING_TYPES.statistics, true);
  }
  function onRetry(id) {
    retryOperation({id: id, type: 'RETRY_WORKFLOW_INSTANCE'});
    triggerPolling(POLLING_TYPES.workflowInstances, true);
    triggerPolling(POLLING_TYPES.batchOperations, true);
    triggerPolling(POLLING_TYPES.statistics, true);
  }

  return (
    <>
      <h2>Instances</h2>
      <table className={classNames.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={areAllIdsSelected}
                onChange={event => {
                  setAreAllIdsSelected(event.target.checked);
                  setSelectedIds([]);
                }}
              />
            </th>
            <th />
            <th>Workflow</th>
            <th>Instance id</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {workflowInstances &&
            workflowInstances.map(({id, workflowName, state, startDate, endDate, hasActiveOperation}) => (
              <tr key={id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(id) || areAllIdsSelected}
                    onChange={event => {
                      if (event.target.checked) {
                        setSelectedIds([...selectedIds, id]);
                      } else if (areAllIdsSelected) {
                        setSelectedIds(workflowInstances.map(({id}) => id).filter(selectedId => selectedId !== id));
                        setAreAllIdsSelected(false);
                      } else {
                        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
                      }
                    }}
                  />
                </td>
                <td>{state}</td>
                <td>{workflowName}</td>
                <td>{id}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>
                  {hasActiveOperation && 'Loading...'}
                  {STATE.INCIDENT === state && (
                    <button onClick={() => onRetry(id)} type="button">
                      Retry
                    </button>
                  )}
                  <button onClick={() => onCancel(id)} type="button">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button type="button" disabled={!areAllIdsSelected && selectedIds.length === 0}>
          Retry
        </button>
        <button type="button" onClick={() => onBatchCancel()} disabled={!areAllIdsSelected && selectedIds.length === 0}>
          Cancel
        </button>
        <Pagination
          totalCount={totalInstanceCount}
          onPaginate={page => {
            console.log(page);
          }}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    operations: state.operations,
    workflowInstances: state.instances.instances,
    activeInstances: state.instances.active,
    totalInstanceCount: state.instances.totalCount,
    isLoading: state.instances.isLoading,
  };
};
export default withPolling([POLLING_TYPES.workflowInstances, POLLING_TYPES.batchOperations, POLLING_TYPES.statistics])(
  connect(mapStateToProps, {
    cancelOperation,
    retryOperation,
    getWorkflowInstances,
    createBatchOperation,
    triggerPolling,
  })(Table),
);
