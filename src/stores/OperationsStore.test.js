import OperationsStore from './OperationsStore';

jest.mock('../App/api', () => ({
  fetchOperations: jest.fn().mockReturnValue([{id: '123', endDate: '2020-02-20'}]),
  createOperation: jest.fn().mockReturnValue({id: '456', endDate: null}),
}));

test('should fetch and update state', async () => {
  const operationsStore = new OperationsStore({instancesStore: {}});

  await operationsStore.init();

  expect(operationsStore.state).toEqual({operations: [{id: '123', endDate: '2020-02-20'}]});
});

test('should fetch and update state', async () => {
  const setOperationActive = jest.fn();
  const operationsStore = new OperationsStore({instancesStore: {setOperationActive}});

  await operationsStore.init();
  await operationsStore.createOperation('id-123-123');

  expect(operationsStore.state).toEqual({
    operations: [
      {id: '456', endDate: null},
      {id: '123', endDate: '2020-02-20'},
    ],
  });

  expect(setOperationActive).toHaveBeenCalledWith('id-123-123');
});
