import createApp from './app';

const run = async () => {
  const app = await createApp();

  const port = process.env.PORT || 3000;

  app.listen(+port, () => {
    console.log(`Listening on port ${port}`);
  });
};

run().catch((err) => {
  console.error('Failed to run server:', err);
});
