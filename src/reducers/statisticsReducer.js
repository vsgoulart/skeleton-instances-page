const defaultState = {statistics: {}};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_STATISTICS': {
      return {...state, statistics: action.payload};
    }
    default:
      return state;
  }
};
