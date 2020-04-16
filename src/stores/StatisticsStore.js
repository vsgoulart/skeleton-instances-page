import {observable, decorate, action} from 'mobx';
import {fetchStatistics} from '../App/api';

const DEFAULT_STATE = {
  instances: 0,
  incidents: 0,
  filter: 0,
};

class StatisticsStore {
  state = {...DEFAULT_STATE};

  init = async () => {
    await this.getStatistics();
  };

  reset = () => {
    this.state = {...DEFAULT_STATE};
  };

  getStatistics = async () => {
    const statistics = await fetchStatistics();
    this.setCount(statistics);
  };

  setCount = ({running, withIncidents}) => {
    this.state = {instances: running, incidents: withIncidents};
  };
}

decorate(StatisticsStore, {
  state: observable,
  reset: action,
  setCount: action,
});

export default StatisticsStore;
