import express from 'express';
import db from './db/connect';
import routes from './routes';
const app = express();
app.use(express.json());

require('dotenv').config();


db();
routes(app);
const host = process.env.HOST as string;

const port = Number(process.env.PORT);

 console.log("hey there");

app.listen(port, () => {
  console.log(`app is listening to port ${port} in ${host}`);
});
