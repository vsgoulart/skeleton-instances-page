export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_STATISTICS': {
      return action.payload;
    }
    default:
      return state;
  }
};
