export const getStatistics = () => async dispatch => {
  const response = await fetch('/api/workflow-instances/core-statistics');
  var responseJson = await response.json();
  dispatch({
    type: 'GET_STATISTICS',
    payload: responseJson,
  });
};
export const pollStatistics = isPollingActive => async (dispatch, getState) => {
  if (!isPollingActive) {
    dispatch({
      type: 'POLL_STATISTICS_END',
    });
    return;
  }

  dispatch({
    type: 'POLL_STATISTICS_BEGIN',
  });

  var timerId = setInterval(async function () {
    if (!getState().statistics.isPolling) {
      clearInterval(timerId);
      return;
    }
    const response = await fetch('/api/workflow-instances/core-statistics');
    var responseJson = await response.json();
    dispatch({
      type: 'GET_STATISTICS',
      payload: responseJson,
    });
  }, 5000);
};
