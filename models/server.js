const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/user.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const { db } = require('../database/db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      user: '/api/v1/user',
      repairs: '/api/v1/repairs',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('database authenticated'))
      .catch(err => console.log(err));

    db.sync()
      .then(() => console.log('database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on the port: ${this.port}`);
    });
  }
}

module.exports = Server;
