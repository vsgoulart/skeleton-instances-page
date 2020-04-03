import React from 'react';
import FilterStore from '../stores/FilterStore';
import InstancesStore from '../stores/InstancesStore';
import OperationsStore from '../stores/OperationsStore';
import StatisticsStore from '../stores/StatisticsStore';

export const stores = {
  filterStore: new FilterStore(),
  instancesStore: new InstancesStore(),
  operationsStore: new OperationsStore(),
  statisticsStore: new StatisticsStore(),
};

export const storesContext = React.createContext(stores);
