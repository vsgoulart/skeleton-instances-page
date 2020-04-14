export default (state = {}, action) => {
  switch (action.type) {
    case 'CANCEL_OPERATION': {
      return {...state};
    }
    case 'RETRY_OPERATION': {
      return {...state};
    }
    case 'CREATE_BATCH_OPREATION': {
      return {...state};
    }
    case 'GET_OPERATIONS': {
      return {...state, operations: action.payload};
    }

    default:
      return state;
  }
};
