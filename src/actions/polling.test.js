// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import {triggerPolling} from './polling';

test('triggerPolling', async () => {
  var mockDispatch = jest.fn();

  await triggerPolling('type', true)(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'TRIGGER_POLLING',
    payload: {type: 'type', isPolling: true},
  });
});
