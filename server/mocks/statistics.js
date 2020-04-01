const {INSTANCES} = require('./instances');

const STATISTICS = Object.freeze({
  running: INSTANCES.workflowInstances.length,
  active: INSTANCES.workflowInstances.reduce(
    (accumulator, {state}) => (state === 'ACTIVE' ? accumulator + 1 : accumulator),
    0,
  ),
  withIncidents: INSTANCES.workflowInstances.reduce(
    (accumulator, {state}) => (state === 'INCIDENT' ? accumulator + 1 : accumulator),
    0,
  ),
});

module.exports = {STATISTICS};
