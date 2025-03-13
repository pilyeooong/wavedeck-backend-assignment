module.exports = {
  apps: [
    {
      name: 'app',
      script: 'ts-node -r tsconfig-paths/register --files src/run.ts',
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'uploads', 'dist'],
    },
    {
      name: 'worker',
      script: 'ts-node -r tsconfig-paths/register --files src/jobs/worker.ts',
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'uploads', 'dist'],
    },
  ],
};
