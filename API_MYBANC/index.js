import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api_mybanc.log' }),
  ],
  //prettier-ignore
  format: combine(
    label({label: 'api_mybanc'}),
    timestamp(),
    myFormat
  )
});

const app = express();
app.use(express.json());
/* cors é uma biblicoteca para liberar outros servidores usarem essa API */
app.use(cors());
/* SWAGGER É o nosso arquivo doc.js DOCUMENTACAO */
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/account', accountsRouter);

/* app.listen ao iniciar a api, ele vai verificar se existe um arquivo 'accounts.json'
caso não encontre ele vai criar um arquivo accounts.json com uma extrutura básica
que criamos na 'const initialJson' */
app.listen(8080, async () => {
  try {
    await fs.readFile('accounts.json');
    global.logger.info('API MyBanc Started');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    fs.writeFile('accounts.json', JSON.stringify(initialJson))
      .then(() => {
        global.logger.info('API MyBanc Started');
      })
      .catch((error) => {
        global.logger.error(error);
      });
  }
});
