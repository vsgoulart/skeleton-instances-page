import {observable, computed, decorate, action} from 'mobx';

const DEFAULT_STATE = {
  workflow: '',
  ids: '',
  errorMessage: '',
  version: '',
  startDate: '',
  endDate: '',
  active: true,
  incidents: false,
};

class FilterStore {
  state = {...DEFAULT_STATE};

  get searchParams() {
    const params = new URLSearchParams();
    Object.entries(this.state).forEach(([key, value]) => {
      params.set(key, value);
    });
    return params.toString();
  }

  setFilter = (key, value) => {
    this.state[key] = value;
  };

  reset = () => {
    this.state = {...DEFAULT_STATE};
  };
}

decorate(FilterStore, {
  state: observable,
  searchParams: computed,
  setFilter: action,
  reset: action,
});

export default FilterStore;
