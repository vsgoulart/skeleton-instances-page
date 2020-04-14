export default (state = {}, action) => {
  switch (action.type) {
    case 'TRIGGER_POLLING': {
      return {...state, [action.payload.type]: action.payload.isPolling};
    }

    default:
      return state;
  }
};
