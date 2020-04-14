import {createEvent} from 'effector';
import {instances$} from './stores';

const startInstanceOperation = createEvent();

instances$.on(startInstanceOperation, (instances, id) =>
  instances.map(instance => {
    if (instance.id === id) {
      return {...instance, hasActiveOperation: true};
    }

    return instance;
  }),
);

export {startInstanceOperation};
