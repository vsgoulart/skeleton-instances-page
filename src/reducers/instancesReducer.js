export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_WORKFLOW_INSTANCES_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POLL_WORKFLOW_INSTANCES_BEGIN': {
      return {
        ...state,
        isPolling: true,
      };
    }
    case 'POLL_WORKFLOW_INSTANCES_END': {
      return {
        ...state,
        isPolling: false,
      };
    }
    case 'GET_WORKFLOW_INSTANCES_FINISHED': {
      var activeInstances = action.payload.workflowInstances
        .filter(instance => instance.hasActiveOperation)
        .map(x => {
          return x.id;
        });

      return {
        ...state,
        active: activeInstances,
        instances: action.payload.workflowInstances,
        totalCount: action.payload.totalCount,
        isLoading: false,
      };
    }
    case 'SET_INSTANCES_AS_ACTIVE': {
      const activeInstanceIds = action.payload.activeInstanceIds;
      let instances = action.payload.workflowInstances;

      instances.forEach(instance => {
        if (activeInstanceIds.includes(instance.id)) {
          instance.hasActiveOperation = true;
        }
      });

      var active = instances
        .filter(instance => instance.hasActiveOperation)
        .map(x => {
          return x.id;
        });

      return {
        ...state,
        active: active,
        instances: instances,
      };
    }

    default:
      return state;
  }
};
