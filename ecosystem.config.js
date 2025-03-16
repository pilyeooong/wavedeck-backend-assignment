module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/run.js',
      instances: 1,
      exec_mode: 'cluster',
      exp_backoff_restart_delay: 100,
    },
    {
      name: 'worker',
      script: 'dist/jobs/worker.js',
      instances: 2,
      exec_mode: 'cluster',
      exp_backoff_restart_delay: 100,
    },
  ],
};
