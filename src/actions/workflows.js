const getGroupedWorkflows = () => async dispatch => {
  const payload = await fetch('/api/workflows/grouped').then(response => response.json());

  dispatch({
    type: 'GET_GROUPED_WORKFLOWS',
    payload,
  });
};

export {getGroupedWorkflows};
