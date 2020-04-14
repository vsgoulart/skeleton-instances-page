import {createEvent} from 'effector';
import {selectedInstances$, instances$, areAllInstancesSelected$} from './stores';

const removeInstance = createEvent();

selectedInstances$.on(removeInstance, (state, instanceId) => {
  const ids = instances$.getState().map(({id}) => id);
  const areAllInstancesSelected = areAllInstancesSelected$.getState();

  if (areAllInstancesSelected) {
    return ids.filter(id => id !== instanceId);
  } else {
    return state.filter(selectedInstanceId => selectedInstanceId !== instanceId);
  }
});
areAllInstancesSelected$.on(removeInstance, () => false);

export {removeInstance};
