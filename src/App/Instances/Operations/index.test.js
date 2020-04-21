import React from 'react';
import {render, waitForElementToBeRemoved} from '@testing-library/react';

import {Operations} from './index';
import {createOperation} from '../../../stores/operations';

const MOCK_FINISHED_OPERATION = Object.freeze({
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

const MOCK_ACTIVE_OPERATION = Object.freeze({
  id: '510421d6-4b07-4662-9639-a0f23e62940a',
  name: null,
  type: 'CANCEL_WORKFLOW_INSTANCE',
  startDate: '2020-03-31T11:49:51.643+0000',
  endDate: null,
  instancesCount: 1,
  operationsTotalCount: 1,
  operationsFinishedCount: 0,
  sortValues: ['9223372036854775807', '1585655391643'],
});

describe('<Operations />', () => {
  it('should hide the loading symbol', async () => {
    fetch.once(JSON.stringify([]));
    const {queryByText} = render(<Operations />);

    await waitForElementToBeRemoved(() => queryByText('loading'));

    expect(queryByText('loading')).toBeNull();
  });

  it('should show the operations', async () => {
    fetch.once(JSON.stringify([MOCK_FINISHED_OPERATION]));
    const {findByText} = render(<Operations />);

    expect(await findByText(MOCK_FINISHED_OPERATION.id)).toBeInTheDocument();
  });

  it('should show a new active operation', async () => {
    fetch.once(JSON.stringify([])).once(JSON.stringify(MOCK_ACTIVE_OPERATION), {status: 200});
    const {findByText} = render(<Operations />);

    createOperation({id: 1, operationType: 'CANCEL_WORKFLOW_INSTANCE'});

    expect(await findByText(MOCK_ACTIVE_OPERATION.id)).toBeInTheDocument();
  });

  // this test doesn't work because of some Jest limitations
  it.skip('should poll until active operations end', async () => {
    jest.useFakeTimers();
    fetch.once(JSON.stringify([MOCK_ACTIVE_OPERATION])).once(JSON.stringify([MOCK_FINISHED_OPERATION]));
    const {findByText} = render(<Operations />);

    jest.advanceTimersByTime(5000);

    expect(await findByText(MOCK_FINISHED_OPERATION.endDate)).toBeInTheDocument();
  });
});
