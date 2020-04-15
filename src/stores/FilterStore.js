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

  // this is acomputed value which derives from the original state.
  // in the component it can be observed in the same way like observables.
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

  /**
   * instead of decorating the methods/variables using "decorate" like below,
   * decorators can be used on the methods/vars directly like this:
   *
   * @action
   * reset = () => {
   *   this.state = {...DEFAULT_STATE};
   * };
   */
}

decorate(FilterStore, {
  state: observable,
  searchParams: computed,
  setFilter: action,
  reset: action,
});

export default FilterStore;
