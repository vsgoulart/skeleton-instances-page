import React from 'react';

import {render, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Table} from './';

jest.mock('../../api', () => ({
  fetchWorkflowInstances: jest.fn().mockReturnValue({workflowInstances: [{id: '123456654321'}]}),
}));

// this is an integration test, where the mobx store is also tested, only the API endpoints are mockec
test('should render instance', async () => {
  const {getAllByText, debug} = render(<Table />);

  await wait(() => expect(getAllByText('123456654321')).toHaveLength(1));
  debug();
});
