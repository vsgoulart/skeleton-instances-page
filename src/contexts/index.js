import React from 'react';
import FilterStore from '../stores/FilterStore';
import InstancesStore from '../stores/InstancesStore';
import OperationsStore from '../stores/OperationsStore';
import StatisticsStore from '../stores/StatisticsStore';

const filterStore = new FilterStore();
const statisticsStore = new StatisticsStore();
const instancesStore = new InstancesStore({filterStore, statisticsStore});
const operationsStore = new OperationsStore({instancesStore});

export const stores = {
  filterStore,
  operationsStore,
  statisticsStore,
  instancesStore,
};

export const storesContext = React.createContext(stores);
