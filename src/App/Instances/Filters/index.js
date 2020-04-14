import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useStore} from 'effector-react';
import classNames from './index.module.scss';
import {ENDPOINTS} from '../../../stores/endpoints';
import {totalCount$} from '../../../stores/instances';

const PARAMS = ['workflow', 'version', 'ids', 'errorMessage', 'startDate', 'endDate', 'active', 'incidents'];

function Filters() {
  const {workflow, version, ids, errorMessage, startDate, endDate, active, incidents} = useSearchParams(PARAMS);
  const history = useHistory();
  const [workflows, setWorkflows] = useState([]);
  const totalFilterCount = useStore(totalCount$);

  useEffect(() => {
    async function fetchWorkflows() {
      setWorkflows(await fetch(ENDPOINTS.workflows).then(response => response.json()));
    }

    fetchWorkflows();
  }, []);

  function updateParam(name, value) {
    const searchParams = new URLSearchParams(window.location.search);

    if (value === '' || value === false) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }

    history.push({search: searchParams.toString()});
  }

  return (
    <div className={classNames.filters}>
      <h2>
        Filters <span>{totalFilterCount}</span>
      </h2>
      <label htmlFor="workflow" className={classNames.label}>
        <span className={classNames.labelText}>Workflow</span>
        <select
          name="workflow"
          id="workflow"
          value={workflow}
          onChange={event => {
            updateParam('workflow', event.target.value);
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
            updateParam('version', event.target.value);
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
            updateParam('ids', event.target.value);
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
            updateParam('errorMessage', event.target.value);
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
            updateParam('startDate', event.target.value);
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
            updateParam('endDate', event.target.value);
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
            updateParam('active', event.target.checked);
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
            updateParam('incidents', event.target.checked);
          }}
        />
      </label>
    </div>
  );
}

function useSearchParams(params) {
  const searchParams = new URLSearchParams(useLocation().search);

  return params.reduce((accumulator, param) => {
    if (searchParams.get(param) === 'true') {
      return {
        ...accumulator,
        [param]: true,
      };
    }

    if (searchParams.get(param) === 'false') {
      return {
        ...accumulator,
        [param]: false,
      };
    }

    return {
      ...accumulator,
      [param]: searchParams.get(param) ?? '',
    };
  }, {});
}

function getVersions(workflows, id) {
  const workflow = workflows.find(({bpmnProcessId}) => bpmnProcessId === id);

  return workflow === undefined ? [] : workflow.workflows;
}

export {Filters};
