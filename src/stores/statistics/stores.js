import {createStore} from 'effector';

const statistics$ = createStore({
  running: 0,
  active: 0,
  withIncidents: 0,
});

export {statistics$};
