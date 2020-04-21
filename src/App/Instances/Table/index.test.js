import React from 'react';
import {render, within, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {Table} from './index';
import {operations$} from '../../../stores/operations';

const MOCK_INSTANCE = Object.freeze({
  id: '2251799813727383',
  workflowId: '2251799813685863',
  workflowName: 'Timer process',
  workflowVersion: 1,
  startDate: '2020-03-31T18:17:20.735+0000',
  endDate: null,
  state: 'ACTIVE',
  bpmnProcessId: 'timerProcess',
  hasActiveOperation: false,
  operations: [],
});
const MOCK_INSTANCES = Object.freeze({
  workflowInstances: [MOCK_INSTANCE],
  totalCount: 1,
});
const MOCK_OPERATION = Object.freeze({
  id: '510421d6-4b07-4662-9639-a0f23e62940a',
  name: null,
  type: 'CANCEL_WORKFLOW_INSTANCE',
  startDate: '2020-03-31T11:49:51.643+0000',
  endDate: '2020-03-31T11:49:59.999+0000',
  instancesCount: 1,
  operationsTotalCount: 1,
  operationsFinishedCount: 1,
  sortValues: ['1585655399999', '1585655391643'],
});

describe('<Table />', () => {
  const MockApp = () => {
    return (
      <MemoryRouter>
        <Table />
      </MemoryRouter>
    );
  };

  it('should load instances', async () => {
    fetch.once(JSON.stringify(MOCK_INSTANCES), {status: 200});
    const {findByText} = render(<MockApp />);

    expect(await findByText(MOCK_INSTANCE.id)).toBeInTheDocument();
  });

  it('should create an action', async () => {
    fetch.once(JSON.stringify(MOCK_INSTANCES), {status: 200}).once(JSON.stringify(MOCK_OPERATION), {status: 200});
    const {findByTestId} = render(<MockApp />);
    const {getByText} = within(await findByTestId(`row-${MOCK_INSTANCE.id}`));

    fireEvent.click(getByText('Cancel'));

    await waitFor(() => expect(operations$.getState()).toHaveLength(1));
  });
});
