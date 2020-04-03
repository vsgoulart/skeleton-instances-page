import {observable, decorate, action} from 'mobx';

const DEFAULT_STATE = {
  operations: [],
};

class OperationsStore {
  state = {...DEFAULT_STATE};

  setOperations = operations => {
    this.state.operations = operations;
  };
}

decorate(OperationsStore, {
  state: observable,
  setOperations: action,
});

export default OperationsStore;
