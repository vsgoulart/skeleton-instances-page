export const triggerPolling = (type, isPolling) => async dispatch => {
  dispatch({
    type: 'TRIGGER_POLLING',
    payload: {type: type, isPolling: isPolling},
  });
};
