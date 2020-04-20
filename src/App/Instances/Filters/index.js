import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react';

import classNames from './index.module.scss';
import {fetchWorkflows} from '../../api';
import {useStores} from '../../../hooks/useStores';

const Filters = observer(() => {
  const history = useHistory();
  const [workflows, setWorkflows] = useState([]);
  const {filterStore, instancesStore} = useStores();
  const {workflow, version, ids, errorMessage, startDate, endDate, active, incidents} = filterStore.state;

  useEffect(() => {
    async function loadWorkflows() {
      setWorkflows(await fetchWorkflows());
    }
    loadWorkflows();

    return () => {
      filterStore.reset();
    };
  }, [filterStore]);

  useEffect(() => {
    const update = async () => {
      history.push({search: filterStore.searchParams});
      instancesStore.getInstances();
    };
    update();
  }, [instancesStore, filterStore.searchParams, history]);

  return (
    <div className={classNames.filters}>
      <h2>
        Filters <span>{instancesStore.state.totalCount}</span>
      </h2>

      <label htmlFor="workflow" className={classNames.label}>
        <span className={classNames.labelText}>Workflow</span>
        <select
          name="workflow"
          id="workflow"
          value={workflow}
          onChange={event => {
            filterStore.setFilter('workflow', event.target.value);
          }}
          disabled={workflows.length === 0}
        >
          <option value="">Select a value</option>
          {workflows.map(({bpmnProcessId, name}) => (
            <option key={bpmnProcessId} value={bpmnProcessId}>
              {name || bpmnProcessId}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="version" className={classNames.label}>
        <span className={classNames.labelText}>Version</span>
        <select
          name="version"
          id="version"
          value={version}
          onChange={event => {
            filterStore.setFilter('version', event.target.value);
          }}
          disabled={workflow === '' && workflows.length === 0}
        >
          <option value="">Select a value</option>
          {getVersions(workflows, workflow).map(({id, version}) => (
            <option key={id}>{version}</option>
          ))}
        </select>
      </label>
      <label htmlFor="ids" className={classNames.label}>
        <span className={classNames.labelText}>Instance Id(s)</span>
        <textarea
          name="ids"
          id="ids"
          value={ids}
          onChange={event => {
            filterStore.setFilter('ids', event.target.value);
          }}
        />
      </label>
      <label htmlFor="errorMessage" className={classNames.label}>
        <span className={classNames.labelText}>Error message</span>
        <input
          type="text"
          name="errorMessage"
          id="errorMessage"
          value={errorMessage}
          onChange={event => {
            filterStore.setFilter('errorMessage', event.target.value);
          }}
        />
      </label>
      <label htmlFor="startDate" className={classNames.label}>
        <span className={classNames.labelText}>Start Date</span>
        <input
          type="text"
          name="startDate"
          id="startDate"
          value={startDate}
          onChange={event => {
            filterStore.setFilter('startDate', event.target.value);
          }}
        />
      </label>
      <label htmlFor="endDate" className={classNames.label}>
        <span className={classNames.labelText}>End Date</span>
        <input
          type="text"
          name="endDate"
          id="endDate"
          value={endDate}
          onChange={event => {
            filterStore.setFilter('endDate', event.target.value);
          }}
        />
      </label>
      <label htmlFor="active" className={classNames.label}>
        <span className={classNames.labelText}>Active</span>
        <input
          type="checkbox"
          name="active"
          id="active"
          checked={active ?? false}
          onChange={event => {
            filterStore.setFilter('active', event.target.checked);
          }}
        />
      </label>
      <label htmlFor="incidents" className={classNames.label}>
        <span className={classNames.labelText}>Incidents</span>
        <input
          type="checkbox"
          name="incidents"
          id="incidents"
          checked={incidents ?? false}
          onChange={event => {
            filterStore.setFilter('incidents', event.target.checked);
          }}
        />
      </label>
    </div>
  );
});

function getVersions(workflows, id) {
  const workflow = workflows.find(({bpmnProcessId}) => bpmnProcessId === id);

  return workflow === undefined ? [] : workflow.workflows;
}

export {Filters};
