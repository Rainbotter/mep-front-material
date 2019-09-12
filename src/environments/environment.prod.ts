import { version } from '../../package.json';

export const environment = {
  production: true,
  apiUrl: 'https://mep.bober.ovh/api',
  paths: {
    meps: '/meps',
    templates: '/templates',
    apis: '/apis',
    stepsets: '/stepsets',
    steps: '/steps',
  },
  version
};
