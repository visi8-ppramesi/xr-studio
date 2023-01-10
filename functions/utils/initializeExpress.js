const cors = require("cors");
const express = require("express");

exports.appBuilder = () => {
  const app = express();
  app.use(cors({origin: true}));
  app.use(express.json());

  return app;
};
