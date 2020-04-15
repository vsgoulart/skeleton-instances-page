import React, {useEffect} from 'react';

import classNames from './index.module.scss';
import {Pagination} from './Pagination';
import {useStores} from '../../../hooks/useStores';
import {observer, useLocalStore} from 'mobx-react';
import {
  createOperation,
  fetchOperations,
  fetchWorkflowInstances,
  fetchStatistics,
  createBatchOperation,
} from '../../api';

const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

const Table = observer(() => {
  const {filterStore, instancesStore, operationsStore, statisticsStore} = useStores();
  const {workflowInstances, totalCount} = instancesStore.state;

  useEffect(() => {
    const loadWorkflowInstances = async () => {
      const instances = await fetchWorkflowInstances(filterStore.searchParams);
      instancesStore.setInstances(instances);
    };

    loadWorkflowInstances();

    return () => {
      // it is important to reset the store to default when unmounting the component
      // otherwise it would show the old state on the next mount.
      instancesStore.reset();
    };
  }, [filterStore, instancesStore]);

  // For component state we could use useLocalStorage from mobx or useState from react
  // https://mobx-react.js.org/state-local
  const selection = useLocalStore(() => ({
    selectedIds: [],
    setSelectedIds(ids) {
      selection.selectedIds = ids;
    },
    areAllIdsSelected: false,
    setAreAllIdsSelected(state) {
      selection.areAllIdsSelected = state;
    },
    // this is a computed value deriving state from observables
    get ids() {
      return selection.areAllIdsSelected ? [] : selection.selectedIds;
    },
    get query() {
      return {...filterStore.state, ids: selection.ids, excludedIds: []};
    },
  }));

  const handleSingleClick = (instanceId, operationType) => async () => {
    await createOperation(instanceId, operationType);

    // this triggers all 3 requests concurrently
    const [operations, instances, count] = await Promise.all([
      fetchOperations(),
      fetchWorkflowInstances(filterStore.searchParams),
      fetchStatistics(),
    ]);

    operationsStore.setOperations(operations);
    instancesStore.setInstances(instances);
    statisticsStore.setCount(count);
  };

  const handleBatchClick = operationType => async () => {
    createBatchOperation({operationType, query: selection.query});
  };

  const {selectedIds, setSelectedIds, setAreAllIdsSelected, areAllIdsSelected} = selection;

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
          {workflowInstances.map(({id, workflowName, state, startDate, endDate, hasActiveOperation}) => (
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
                {STATE.INCIDENT === state && (
                  <button type="button" onClick={handleSingleClick(id, 'RESOLVE_INCIDENT')}>
                    Retry
                  </button>
                )}
                <button type="button" onClick={handleSingleClick(id, 'CANCEL_WORKFLOW_INSTANCE')}>
                  Cancel
                </button>
                {hasActiveOperation && ' L'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          disabled={!areAllIdsSelected && selectedIds.length === 0}
          onClick={handleBatchClick('RESOLVE_INCIDENT')}
        >
          Retry
        </button>
        <button
          type="button"
          disabled={!areAllIdsSelected && selectedIds.length === 0}
          onClick={handleBatchClick('CANCEL_WORKFLOW_INSTANCE')}
        >
          Cancel
        </button>
        <Pagination
          totalCount={totalCount}
          onPaginate={page => {
            console.log(page);
          }}
        />
      </div>
    </>
  );
});

export {Table};
