import {createEvent} from 'effector';
import {selectedInstances$} from './stores';

const selectInstance = createEvent();

selectedInstances$.on(selectInstance, (state, instanceId) => [...state, instanceId]);

export {selectInstance};
