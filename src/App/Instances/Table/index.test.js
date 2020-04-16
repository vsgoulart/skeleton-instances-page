import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import {render, wait} from '@testing-library/react';
import {Table} from './';

jest.mock('../../api', () => ({
  fetchWorkflowInstances: jest.fn().mockReturnValue({workflowInstances: [{id: '123456654321'}]}),
  fetchStatistics: jest.fn().mockReturnValue({}),
}));

// this is an integration test, where the mobx stores are also tested, only the API endpoints are mocked
test('should render instance', async () => {
  const {getAllByText, debug} = render(<Table />);

  await wait(() => expect(getAllByText('123456654321')).toHaveLength(1));
  debug();
});
