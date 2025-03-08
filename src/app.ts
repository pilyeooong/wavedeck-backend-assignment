import express from "express";
import router from "routes";
import sequelize from "database";

const createApp = async () => {
  const app = express();

  app.use(router);

  try {
    await sequelize.authenticate();
    console.log("Database successfully connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return app;
};

export default createApp;
