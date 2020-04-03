import {observable, decorate, action} from 'mobx';

const DEFAULT_STATE = {
  workflowInstances: [],
  totalCount: 0,
};

class InstancesStore {
  state = {...DEFAULT_STATE};

  setInstances = ({workflowInstances, totalCount}) => {
    this.state.workflowInstances = workflowInstances;
    this.state.totalCount = totalCount;
  };

  reset = () => {
    this.state = {...DEFAULT_STATE};
  };
}

decorate(InstancesStore, {
  state: observable,
  setInstances: action,
  reset: action,
});

export default InstancesStore;
