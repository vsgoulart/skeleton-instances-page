const WORKFLOWS = Object.freeze([
  {
    bpmnProcessId: 'bigVarProcess',
    name: 'Big variable process',
    workflows: [
      {
        id: '2251799813685834',
        name: 'Big variable process',
        version: 1,
        bpmnProcessId: 'bigVarProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'call-activity-process',
    name: 'Call Activity Process',
    workflows: [
      {
        id: '2251799813685866',
        name: 'Call Activity Process',
        version: 1,
        bpmnProcessId: 'call-activity-process',
      },
    ],
  },
  {
    bpmnProcessId: 'called-process',
    name: 'Called Process',
    workflows: [
      {
        id: '2251799813695133',
        name: 'Called Process',
        version: 1,
        bpmnProcessId: 'called-process',
      },
    ],
  },
  {
    bpmnProcessId: 'errorProcess',
    name: 'Error Process',
    workflows: [
      {
        id: '2251799813685872',
        name: 'Error Process',
        version: 1,
        bpmnProcessId: 'errorProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'eventSubprocessWorkflow',
    name: 'Event Subprocess Workflow',
    workflows: [
      {
        id: '2251799813685868',
        name: 'Event Subprocess Workflow',
        version: 1,
        bpmnProcessId: 'eventSubprocessWorkflow',
      },
    ],
  },
  {
    bpmnProcessId: 'eventBasedGatewayProcess',
    name: 'Event based gateway with timer start',
    workflows: [
      {
        id: '2251799813695124',
        name: 'Event based gateway with timer start',
        version: 2,
        bpmnProcessId: 'eventBasedGatewayProcess',
      },
      {
        id: '2251799813685854',
        name: 'Event based gateway with message start',
        version: 1,
        bpmnProcessId: 'eventBasedGatewayProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'flightRegistration',
    name: 'Flight registration',
    workflows: [
      {
        id: '2251799813695112',
        name: 'Flight registration',
        version: 2,
        bpmnProcessId: 'flightRegistration',
      },
      {
        id: '2251799813685846',
        name: 'Flight registration',
        version: 1,
        bpmnProcessId: 'flightRegistration',
      },
    ],
  },
  {
    bpmnProcessId: 'multiInstanceProcess',
    name: 'Multi-Instance Process',
    workflows: [
      {
        id: '2251799813685848',
        name: 'Multi-Instance Process',
        version: 1,
        bpmnProcessId: 'multiInstanceProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'prWithSubprocess',
    name: 'Nested subprocesses',
    workflows: [
      {
        id: '2251799813685857',
        name: 'Nested subprocesses',
        version: 1,
        bpmnProcessId: 'prWithSubprocess',
      },
    ],
  },
  {
    bpmnProcessId: 'onlyIncidentsProcess',
    name: 'Only Incidents Process',
    workflows: [
      {
        id: '2251799813685423',
        name: 'Only Incidents Process',
        version: 2,
        bpmnProcessId: 'onlyIncidentsProcess',
      },
      {
        id: '2251799813685253',
        name: 'Only Incidents Process',
        version: 1,
        bpmnProcessId: 'onlyIncidentsProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'orderProcess',
    name: 'Order process',
    workflows: [
      {
        id: '2251799813695104',
        name: 'Order process',
        version: 2,
        bpmnProcessId: 'orderProcess',
      },
      {
        id: '2251799813685841',
        name: 'Order process',
        version: 1,
        bpmnProcessId: 'orderProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'timerProcess',
    name: 'Timer process',
    workflows: [
      {
        id: '2251799813685863',
        name: 'Timer process',
        version: 1,
        bpmnProcessId: 'timerProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'withoutIncidentsProcess',
    name: 'Without Incidents Process',
    workflows: [
      {
        id: '2251799813685718',
        name: 'Without Incidents Process',
        version: 2,
        bpmnProcessId: 'withoutIncidentsProcess',
      },
      {
        id: '2251799813685670',
        name: 'Without Incidents Process',
        version: 1,
        bpmnProcessId: 'withoutIncidentsProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'noInstancesProcess',
    name: 'Without Instances Process',
    workflows: [
      {
        id: '2251799813685251',
        name: 'Without Instances Process',
        version: 2,
        bpmnProcessId: 'noInstancesProcess',
      },
      {
        id: '2251799813685249',
        name: 'Without Instances Process',
        version: 1,
        bpmnProcessId: 'noInstancesProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'bigProcess',
    name: null,
    workflows: [
      {
        id: '2251799813685870',
        name: null,
        version: 1,
        bpmnProcessId: 'bigProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'complexProcess',
    name: null,
    workflows: [
      {
        id: '2251799813698739',
        name: null,
        version: 3,
        bpmnProcessId: 'complexProcess',
      },
      {
        id: '2251799813695117',
        name: null,
        version: 2,
        bpmnProcessId: 'complexProcess',
      },
      {
        id: '2251799813685851',
        name: null,
        version: 1,
        bpmnProcessId: 'complexProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'error-end-process',
    name: null,
    workflows: [
      {
        id: '2251799813685874',
        name: null,
        version: 1,
        bpmnProcessId: 'error-end-process',
      },
    ],
  },
  {
    bpmnProcessId: 'interruptingBoundaryEvent',
    name: null,
    workflows: [
      {
        id: '2251799813695128',
        name: null,
        version: 2,
        bpmnProcessId: 'interruptingBoundaryEvent',
      },
      {
        id: '2251799813685859',
        name: null,
        version: 1,
        bpmnProcessId: 'interruptingBoundaryEvent',
      },
    ],
  },
  {
    bpmnProcessId: 'loanProcess',
    name: null,
    workflows: [
      {
        id: '2251799813685844',
        name: null,
        version: 1,
        bpmnProcessId: 'loanProcess',
      },
    ],
  },
  {
    bpmnProcessId: 'nonInterruptingBoundaryEvent',
    name: null,
    workflows: [
      {
        id: '2251799813695131',
        name: null,
        version: 2,
        bpmnProcessId: 'nonInterruptingBoundaryEvent',
      },
      {
        id: '2251799813685861',
        name: null,
        version: 1,
        bpmnProcessId: 'nonInterruptingBoundaryEvent',
      },
    ],
  },
]);

export {WORKFLOWS};
