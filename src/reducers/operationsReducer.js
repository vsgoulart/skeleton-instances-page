export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_OPERATION': {
      return [action.payload, ...state];
    }
    case 'CREATE_BATCH_OPREATION': {
      return [action.payload, ...state];
    }
    case 'GET_OPERATIONS': {
      return action.payload;
    }
    default:
      return state;
  }
};
