const defaultState = {statistics: {}};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_STATISTICS': {
      return {...state, statistics: action.payload};
    }
    case 'POLL_STATISTICS_BEGIN': {
      return {...state, isPolling: true};
    }
    case 'POLL_STATISTICS_END': {
      return {...state, isPolling: false};
    }
    default:
      return state;
  }
};
