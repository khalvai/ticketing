import express from 'express';
import log from './logger';
import { string } from 'yup';
import db from './db/connect';
import routes from './routes';
const app = express();
app.use(express.json());
require('dotenv').config();
db();
routes(app);
const host = process.env.HOST as string;
const port = Number(process.env.PORT);

app.listen(port, host, () => {
  log.info(`app is listening to port ${port} in ${host}`);
});
