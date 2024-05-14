import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  level:"debug",
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
