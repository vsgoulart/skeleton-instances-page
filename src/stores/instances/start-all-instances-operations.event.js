import {createEvent} from 'effector';
import {instances$} from './stores';

const startAllInstancesOperations = createEvent();

instances$.on(startAllInstancesOperations, instances =>
  instances.map(instance => {
    return {...instance, hasActiveOperation: true};
  }),
);

export {startAllInstancesOperations};
