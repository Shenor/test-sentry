import * as Sentry from '@sentry/vue';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  Sentry.init({
    Vue: app,
    dsn: 'https://f3952747fdb31ca1d25cd7e5e47971bf@o4506671003074560.ingest.sentry.io/4506671005040640',
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/yourserver\.io\/api/,
        ],
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    trackComponents: true,
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
});
