import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import routes from './routes';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as ip from 'ip';
import * as os from 'os';
import { sequelize } from './models';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

const app = express();
const PROTOCOL = 'http';
const myIP = ip.address();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

const swaggerSpec = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('ScratchNow Server Running!');
});

app.listen(PORT, async () => {
  console.log(
    '\n .d8888b.   .d8888b.  8888888b.         d8888 88888888888 .d8888b.  888    888 888b    888  .d88888b.  888       888       .d8888b.  8888888888 8888888b.  888     888 8888888888 8888888b.  \n' +
      'd88P  Y88b d88P  Y88b 888   Y88b       d88888     888    d88P  Y88b 888    888 8888b   888 d88P" "Y88b 888   o   888      d88P  Y88b 888        888   Y88b 888     888 888        888   Y88b \n' +
      'Y88b.      888    888 888    888      d88P888     888    888    888 888    888 88888b  888 888     888 888  d8b  888      Y88b.      888        888    888 888     888 888        888    888 \n' +
      ' "Y888b.   888        888   d88P     d88P 888     888    888        8888888888 888Y88b 888 888     888 888 d888b 888       "Y888b.   8888888    888   d88P Y88b   d88P 8888888    888   d88P \n' +
      '    "Y88b. 888        8888888P"     d88P  888     888    888        888    888 888 Y88b888 888     888 888d88888b888          "Y88b. 888        8888888P"   Y88b d88P  888        8888888P"  \n' +
      '      "888 888    888 888 T88b     d88P   888     888    888    888 888    888 888  Y88888 888     888 88888P Y88888            "888 888        888 T88b     Y88o88P   888        888 T88b   \n' +
      'Y88b  d88P Y88b  d88P 888  T88b   d8888888888     888    Y88b  d88P 888    888 888   Y8888 Y88b. .d88P 8888P   Y8888      Y88b  d88P 888        888  T88b     Y888P    888        888  T88b  \n' +
      ' "Y8888P"   "Y8888P"  888   T88b d88P     888     888     "Y8888P"  888    888 888    Y888  "Y88888P"  888P     Y888       "Y8888P"  8888888888 888   T88b     Y8P     8888888888 888   T88b \n' +
      '                                                                                                                                                                                             ',
  );
  console.log(
    `======================= 🎨️Environment Info 🎨 =======================\nUser home: ${
      os.userInfo().username
    }\nNode Version: ${process.version}\nNode ENV: ${process.env.NODE_ENV}`,
  );
  await sequelize
    .authenticate()
    .then(async () => {
      console.log(
        `DB connection success! DB Port: ${process.env.DATABASE_PORT}\nScratchNow Server Running! API Doc: ${PROTOCOL}://${myIP}:${PORT}/api-docs`,
      );
    })
    .catch((err) => {
      console.log('DB connection error: ', err);
    });
});
