import exp from 'constants';
import mongoose from 'mongoose';
import log from '../logger';
import dotenv from 'dotenv';
dotenv.config();

function connect() {
  const dbUrl = process.env.dbUrl as string;
  mongoose
    .connect(dbUrl)
    .then(() => {
      log.info('successfuly connected to database...');
    })
    .catch((er) => {
      log.error(er);
      process.exit(1);
    });
}
export default connect;
