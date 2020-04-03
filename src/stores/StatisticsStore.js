import {observable, decorate, action} from 'mobx';

const DEFAULT_STATE = {
  instances: 0,
  incidents: 0,
  filter: 0,
};

class StatisticsStore {
  state = {...DEFAULT_STATE};

  setCount = ({running, withIncidents}) => {
    this.state = {instances: running, incidents: withIncidents};
  };
}

decorate(StatisticsStore, {
  state: observable,
  setCount: action,
});

export default StatisticsStore;
