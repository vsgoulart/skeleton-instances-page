import {createEvent} from 'effector';
import {selectedInstances$, areAllInstancesSelected$} from './stores';

const selectAllInstances = createEvent();

selectedInstances$.on(selectAllInstances, () => []);
areAllInstancesSelected$.on(selectAllInstances, () => true);

export {selectAllInstances};
