export default (state = {instances: [], groupedWorkflows: []}, action) => {
  switch (action.type) {
    case 'SET_INSTANCES_AS_ACTIVE': {
      const activeInstanceIds = action.payload.activeInstanceIds;

      let instances = action.payload.workflowInstances.map(instance => {
        if (activeInstanceIds.includes(instance.id)) {
          instance.hasActiveOperation = true;
        }
        return instance;
      });

      return {
        ...state,
        instances: instances,
      };
    }
    case 'GET_WORKFLOW_INSTANCES': {
      return {
        ...state,
        instances: action.payload.workflowInstances,
        totalCount: action.payload.totalCount,
      };
    }
    default:
      return state;
  }
};
