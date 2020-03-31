import React, {useState} from 'react';

import classNames from './index.module.scss';
import {INSTANCES} from './mocks';
import {Pagination} from './Pagination';

const STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INCIDENT: 'INCIDENT',
});

function Table() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [areAllIdsSelected, setAreAllIdsSelected] = useState(false);
  const {workflowInstances, totalCount} = INSTANCES;

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
                {STATE.INCIDENT === state && <button type="button">Retry</button>}
                <button type="button">Cancel</button>
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
}

export {Table};
