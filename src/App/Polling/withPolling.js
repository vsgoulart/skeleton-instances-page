import * as React from 'react';
import {connect} from 'react-redux';
import {POLLING_TYPES} from '../Polling/constants';
import {getBatchOperations, getWorkflowInstances, getStatistics} from '../../actions';

export const withPolling = (pollingTypes, duration = 5000) => Component => {
  const Wrapper = () =>
    class extends React.Component {
      state = {
        isBatchOperationsPollingActive: false,
        isStatisticsPollingActive: false,
      };

      componentDidUpdate() {
        if (pollingTypes.includes(POLLING_TYPES.workflowInstances)) {
          if (this.workflowInstancesInterval && this.props.workflowPollingActive) {
            return;
          }
          if (!this.workflowInstancesInterval && this.props.workflowPollingActive) {
            this.props.getWorkflowInstances();
            this.workflowInstancesInterval = setInterval(() => {
              this.props.getWorkflowInstances();
            }, duration);
          } else if (this.workflowInstancesInterval && !this.props.workflowPollingActive) {
            clearInterval(this.workflowInstancesInterval);
            this.workflowInstancesInterval = undefined;
          }
        }

        if (pollingTypes.includes(POLLING_TYPES.statistics)) {
          if (this.statisticsInterval && this.props.statisticsPollingActive) {
            return;
          }
          if (!this.statisticsInterval && this.props.statisticsPollingActive) {
            this.props.getStatistics();
            this.statisticsInterval = setInterval(() => {
              this.props.getStatistics();
            }, duration);
          } else if (this.statisticsInterval && !this.props.statisticsPollingActive) {
            clearInterval(this.statisticsInterval);
            this.statisticsInterval = undefined;
          }
        }

        if (pollingTypes.includes(POLLING_TYPES.batchOperations)) {
          if (this.batchOperationsInterval && this.props.batchOperationsPollingActive) {
            return;
          }
          if (!this.batchOperationsInterval && this.props.batchOperationsPollingActive) {
            this.props.getBatchOperations();
            this.batchOperationsInterval = setInterval(() => {
              this.props.getBatchOperations();
            }, duration);
          } else if (this.batchOperationsInterval && !this.props.batchOperationsPollingActive) {
            clearInterval(this.batchOperationsInterval);
            this.batchOperationsInterval = undefined;
          }
        }
      }
      componentWillUnmount() {
        clearInterval(this.workflowInstancesPolling);
        clearInterval(this.statisticsPolling);
        clearInterval(this.batchOperationsPolling);
      }
      render() {
        return <Component {...this.props} />;
      }
    };
  const mapStateToProps = state => {
    return {
      workflowPollingActive: state.polling[POLLING_TYPES.workflowInstances],
      batchOperationsPollingActive: state.polling[POLLING_TYPES.batchOperations],
      statisticsPollingActive: state.polling[POLLING_TYPES.statistics],
    };
  };

  return connect(mapStateToProps, {getBatchOperations, getWorkflowInstances, getStatistics})(Wrapper());
};
