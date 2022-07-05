const ORB = {
  orbApi: {
    version: '1',
    apiUrl: 'api/v',
  },
  servicesUrls: {
    // *auth* service
    // register user
    users: '/users',
    // retrieve auth token
    login: '/tokens',
    // request passwd reset
    requestPasswd: '/password/reset-request',
    // reset passwd
    resetPasswd: '/password/reset',
    // *sinks* service
    sinks: '/sinks',
    sinkBackends: '/feature/sinks',
    // *agents* service
    agents: '/agents',
    agentValidate: '/agents/validate',
    agentBackends: '/agents/backends',
    pktvisorTaps: '/agents/backends/pktvisor/taps',
    pktvisorInputs: '/agents/backends/pktvisor/inputs',
    pktvisorHandlers: '/agents/backends/pktvisor/handlers',
    // *groups* service
    groups: '/agent_groups',
    groupValidate: '/agent_groups/validate',
    // *datasets* service
    datasets: '/policies/dataset',
    // *policies* service
    policies: '/policies/agent',
  },
};

export const environment = {
  orbApi: {
    urlKeys: Object.keys(ORB.servicesUrls),
    ...ORB.orbApi,
    servicesUrls: ORB.servicesUrls,
  },
  ...ORB.servicesUrls,
};
