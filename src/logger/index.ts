import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  prettyPrint: {
    
  },
  option: { colorize: true },
  base: {
    pid: false,
  },
  timestamp: () => `time : ${dayjs().format()}`,
});
export default log;

