export const getStatistics = () => async dispatch => {
  const payload = await fetch('/api/workflow-instances/core-statistics').then(response => response.json());
  dispatch({
    type: 'GET_STATISTICS',
    payload: payload,
  });
};
