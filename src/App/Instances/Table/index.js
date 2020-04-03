import React, {useState, useEffect} from 'react';

import classNames from './index.module.scss';
import {Pagination} from './Pagination';
import {useStores} from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import {createOperation, fetchOperations, fetchWorkflowInstances, fetchStatistics} from '../../api';

const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

const Table = observer(() => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [areAllIdsSelected, setAreAllIdsSelected] = useState(false);
  const {filterStore, instancesStore, operationsStore, statisticsStore} = useStores();
  const {workflowInstances, totalCount} = instancesStore.state;

  useEffect(() => {
    const loadWorkflowInstances = async () => {
      const instances = await fetchWorkflowInstances(filterStore.searchParams);
      instancesStore.setInstances(instances);
    };

    loadWorkflowInstances();

    return () => {
      instancesStore.reset();
    };
  }, [filterStore, instancesStore]);

  const handleClick = (instanceId, operationType) => async () => {
    await createOperation(instanceId, operationType);

    const [operations, instances, count] = await Promise.all([
      fetchOperations(),
      fetchWorkflowInstances(filterStore.searchParams),
      fetchStatistics(),
    ]);

    operationsStore.setOperations(operations);
    instancesStore.setInstances(instances);
    statisticsStore.setCount(count);
  };

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
          {workflowInstances.map(({id, workflowName, state, startDate, endDate}) => (
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
                  <button type="button" onClick={handleClick(id, 'RESOLVE_INCIDENT')}>
                    Retry
                  </button>
                )}
                <button type="button" onClick={handleClick(id, 'CANCEL_WORKFLOW_INSTANCE')}>
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
        <button type="button" disabled={!areAllIdsSelected && selectedIds.length === 0}>
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
