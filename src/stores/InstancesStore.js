import {observable, decorate, action, autorun, computed} from 'mobx';
import {fetchWorkflowInstances} from '../App/api';

const DEFAULT_STATE = {
  workflowInstances: [],
  totalCount: 0,
};

class InstancesStore {
  state = {...DEFAULT_STATE};
  disposer = null;
  intervalId = null;

  constructor(stores) {
    this.stores = stores;
  }

  init = () => {
    this.getInstances();

    this.disposer = autorun(() => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      if (this.hasActiveOperation) {
        this.intervalId = setInterval(() => {
          this.getInstances();
        }, 3000);
      } else {
        clearInterval(this.intervalId);
      }
    });
  };

  get hasActiveOperation() {
    return this.state.workflowInstances.some(instance => instance.hasActiveOperation);
  }

  setInstances = ({workflowInstances, totalCount}) => {
    this.state.workflowInstances = workflowInstances;
    this.state.totalCount = totalCount;
  };

  setOperationActive = instanceId => {
    const instance = this.state.workflowInstances.find(instance => {
      return instance.id === instanceId;
    });

    instance.hasActiveOperation = true;
  };

  getInstances = async () => {
    const {filterStore, statisticsStore} = this.stores;
    this.setInstances(await fetchWorkflowInstances(filterStore.searchParams));
    statisticsStore.getStatistics();
  };

  reset = () => {
    this.state = {...DEFAULT_STATE};
    clearInterval(this.intervalId);
    this.disposer();
  };
}

decorate(InstancesStore, {
  state: observable,
  hasActiveOperation: computed,
  setOperationActive: action,
  setInstances: action,
  reset: action,
});

export default InstancesStore;
