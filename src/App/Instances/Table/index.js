import React, {useState, useEffect} from 'react';

import classNames from './index.module.scss';
import {Pagination} from './Pagination';
import {connect} from 'react-redux';

import {createOperation, createBatchOperation, getWorkflowInstances, setInstancesAsActive} from '../../../actions';
const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

function Table({
  createOperation,
  getWorkflowInstances,
  workflowInstances,
  createBatchOperation,
  totalInstanceCount,
  setInstancesAsActive,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [areAllIdsSelected, setAreAllIdsSelected] = useState(false);

  useEffect(() => {
    getWorkflowInstances();
  }, [getWorkflowInstances]);

  function onCreateOperation(id, type) {
    setInstancesAsActive([id]);
    createOperation({id: id, type: type});
  }

  function onCreateBatchOperation(id, type) {
    setInstancesAsActive(selectedIds);
    createBatchOperation({ids: selectedIds, type: type});
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
                  {console.log(hasActiveOperation)}
                  {hasActiveOperation && 'Loading...'}
                  {STATE.INCIDENT === state && (
                    <button onClick={() => onCreateOperation(id, 'RETRY_WORKFLOW_INSTANCE')} type="button">
                      Retry
                    </button>
                  )}
                  <button onClick={() => onCreateOperation(id, 'CANCEL_WORKFLOW_INSTANCE')} type="button">
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
          onClick={() => onCreateBatchOperation('RETRY_WORKFLOW_INSTANCE')}
          disabled={!areAllIdsSelected && selectedIds.length === 0}
        >
          Retry
        </button>
        <button
          type="button"
          onClick={() => onCreateBatchOperation('CANCEL_WORKFLOW_INSTANCE')}
          disabled={!areAllIdsSelected && selectedIds.length === 0}
        >
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

const mapStateToProps = state => {
  const {instances} = state;

  return {
    workflowInstances: instances.instances,
    totalInstanceCount: instances.totalCount,
  };
};
export default connect(mapStateToProps, {
  createOperation,
  createBatchOperation,
  getWorkflowInstances,
  setInstancesAsActive,
})(Table);
