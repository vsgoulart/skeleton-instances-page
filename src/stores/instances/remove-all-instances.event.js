import {createEvent} from 'effector';
import {selectedInstances$, areAllInstancesSelected$} from './stores';

const removeAllInstances = createEvent();

selectedInstances$.on(removeAllInstances, () => []);
areAllInstancesSelected$.on(removeAllInstances, () => false);

export {removeAllInstances};
