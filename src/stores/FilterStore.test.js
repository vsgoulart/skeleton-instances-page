import FilterStore from './FilterStore';

import {toJS} from 'mobx';

// this is a basic test to check the initial values
test('should set default state', () => {
  const filterStore = new FilterStore();

  console.log(toJS(filterStore.state));

  // test default state
  expect(filterStore.state.active).toBe(true);
  expect(filterStore.state.incidents).toBe(false);
});

// this is a basic test to check if the computed value is correct
test('should have computable', () => {
  const filterStore = new FilterStore();

  filterStore.setFilter('errorMessage', '404 not found');

  expect(filterStore.state.errorMessage).toBe('404 not found');
  expect(filterStore.searchParams).toContain('errorMessage=404+not+found');
  console.log(filterStore.searchParams);
});
