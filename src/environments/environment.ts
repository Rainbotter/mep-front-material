import { version } from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  paths: {
    meps: '/meps',
    templates: '/templates',
    apis: '/apis',
    stepsets: '/stepsets',
    steps: '/steps',
  },
  version
};
