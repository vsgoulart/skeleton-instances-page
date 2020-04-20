export default (state = [], action) => {
  switch (action.type) {
    case 'GET_GROUPED_WORKFLOWS': {
      return action.payload;
    }
    default:
      return state;
  }
};
