import {observable, decorate, action, computed, autorun} from 'mobx';
import {fetchOperations, createOperation, createBatchOperation} from '../App/api';

const DEFAULT_STATE = {
  operations: [],
};

class OperationsStore {
  state = {...DEFAULT_STATE};
  disposer = null;
  intervalId = null;

  constructor(stores) {
    this.stores = stores;
  }

  init = async () => {
    await this.getOperations();

    this.disposer = autorun(() => {
      if (this.hasActiveOperation) {
        this.intervalId = setInterval(() => {
          this.getOperations();
        }, 3000);
      } else {
        clearInterval(this.intervalId);
      }
    });
  };

  get hasActiveOperation() {
    return this.state.operations.some(operation => !operation.endDate);
  }

  getOperations = async () => {
    this.setOperations(await fetchOperations());
  };

  setOperations = operations => {
    this.state.operations = operations;
  };

  createOperation = async (instanceId, operationType) => {
    const operation = await createOperation(instanceId, operationType);

    this.setOperations([operation, ...this.state.operations]);
    this.stores.instancesStore.setOperationActive(instanceId);
  };

  createBatchOperation = async operationType => {
    createBatchOperation(operationType);
  };

  reset = () => {
    this.state = {...DEFAULT_STATE};
    clearInterval(this.intervalId);
    this.disposer();
  };
}

decorate(OperationsStore, {
  state: observable,
  hasActiveOperation: computed,
  setOperations: action,
  reset: action,
});

export default OperationsStore;
