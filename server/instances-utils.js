function startInstanceOperation(instance, newOperationId) {
  return {
    ...instance,
    hasActiveOperation: true,
    operations: [...instance.operations, newOperationId],
  };
}

function endInstanceOperation(instance) {
  return {
    ...instance,
    hasActiveOperation: false,
  };
}

module.exports = {startInstanceOperation, endInstanceOperation};
