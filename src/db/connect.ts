import exp from 'constants';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function connect() {
  const dbUrl = process.env.dbUrl as string;
  mongoose
    .connect(dbUrl)
    .then(() => {
   console.log('successfuly connected to database...');
    })
    .catch((er) => {
      console.error(er);
      process.exit(1);
    });
}
export default connect;
