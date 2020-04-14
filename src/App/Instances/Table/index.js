import React, {useEffect} from 'react';
import {useStore} from 'effector-react';
import {createStoreObject} from 'effector';
import {useLocation} from 'react-router-dom';
import classNames from './index.module.scss';
import {Pagination} from './Pagination';
import {
  fetchInstances,
  instances$,
  isLoading$,
  totalCount$,
  areAllInstancesSelected$,
  selectedInstances$,
  selectAllInstances,
  removeAllInstances,
  selectInstance,
  removeInstance,
  startInstanceOperation,
  startAllInstancesOperations,
} from '../../../stores/instances';
import {createOperation, createBatchOperation} from '../../../stores/operations';

const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

const store = createStoreObject({
  instances: instances$,
  isLoading: isLoading$,
  totalCount: totalCount$,
  areAllInstancesSelected: areAllInstancesSelected$,
  selectedInstances: selectedInstances$,
});

function Table() {
  const {instances, isLoading, totalCount, areAllInstancesSelected, selectedInstances} = useStore(store);
  const location = useLocation();

  useEffect(() => {
    fetchInstances();
  }, [location.search]);

  return (
    <>
      <h2>Instances</h2>
      <table className={classNames.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={areAllInstancesSelected}
                onChange={event => {
                  if (event.target.checked) {
                    selectAllInstances();
                  } else {
                    removeAllInstances();
                  }
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
          {isLoading && (
            <tr>
              <td colSpan={7}>loading</td>
            </tr>
          )}
          {!isLoading &&
            instances.map(({id, workflowName, state, startDate, endDate, hasActiveOperation}) => (
              <tr key={id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedInstances.includes(id) || areAllInstancesSelected}
                    onChange={event => {
                      if (event.target.checked) {
                        selectInstance(id);
                      } else {
                        removeInstance(id);
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
                  {hasActiveOperation && 'loading'}
                  {STATE.INCIDENT === state && (
                    <button
                      type="button"
                      onClick={() => {
                        startInstanceOperation(id);
                        createOperation({id, operationType: 'RESOLVE_INCIDENT'});
                      }}
                    >
                      Retry
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      startInstanceOperation(id);
                      createOperation({id, operationType: 'CANCEL_WORKFLOW_INSTANCE'});
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          disabled={!areAllInstancesSelected && selectedInstances.length === 0}
          onClick={() => {
            removeAllInstances();
            startAllInstancesOperations();
            createBatchOperation({ids: selectedInstances, operationType: 'RESOLVE_INCIDENT'});
          }}
        >
          Retry
        </button>
        <button
          type="button"
          disabled={!areAllInstancesSelected && selectedInstances.length === 0}
          onClick={() => {
            removeAllInstances();
            startAllInstancesOperations();
            createBatchOperation({ids: selectedInstances, operationType: 'CANCEL_WORKFLOW_INSTANCE'});
          }}
        >
          Cancel
        </button>
        <Pagination totalCount={totalCount} onPaginate={fetchInstances} />
      </div>
    </>
  );
}

export {Table};
