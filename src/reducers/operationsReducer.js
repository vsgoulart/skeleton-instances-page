export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_OPERATION': {
      return {...state};
    }
    case 'CREATE_BATCH_OPREATION': {
      return {...state};
    }
    case 'GET_OPERATIONS_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'GET_OPERATIONS_FINISHED': {
      var activeOperations = action.payload
        .filter(operation => !operation.endDate)
        .map(x => {
          return x.id;
        });
      return {...state, operations: action.payload, active: activeOperations, isLoading: false};
    }
    case 'POLL_BATCH_OPERATIONS_BEGIN': {
      return {...state, isPolling: true};
    }
    case 'POLL_BATCH_OPERATIONS_END': {
      return {...state, isPolling: false};
    }
    default:
      return state;
  }
};
