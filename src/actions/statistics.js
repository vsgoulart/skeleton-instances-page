export const getStatistics = () => async dispatch => {
  const response = await fetch('/api/workflow-instances/core-statistics');
  var resposneJson = await response.json();
  dispatch({
    type: 'GET_STATISTICS',
    payload: resposneJson,
  });
};
