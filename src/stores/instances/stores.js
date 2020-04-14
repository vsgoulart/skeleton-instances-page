import {createStore} from 'effector';

const instances$ = createStore([]);
const selectedInstances$ = createStore([]);
const areAllInstancesSelected$ = createStore(false);
const totalCount$ = createStore(0);

export {instances$, selectedInstances$, areAllInstancesSelected$, totalCount$};
