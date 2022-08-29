import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import routes from "./routes";
import * as dotenv from "dotenv";
import * as path from 'path';
import * as ip from 'ip';
import * as os from 'os';
import { sequelize } from "./models";

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === 'production'
            ? '.prod.env' : process.env.NODE_ENV === 'test'
            ? '.test.env' : '.dev.env'
    )
});

const app = express();
const PROTOCOL = 'http';
const myIp = ip.address();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

const swaggerSpec = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => { res.send('ScratchNow Server Running!'); });

app.listen(PORT, async () => {
    console.log(`User home: ${os.userInfo().username}`);
    console.log(`Node Ver: ${process.version}`);
    console.log(`Node ENV: ${process.env.NODE_ENV}`);
    await sequelize.authenticate()
        .then(async () => {
            console.log(`DB connection success port: ${process.env.DATABASE_PORT}`);
        })
        .catch((e) => {
            console.log('DB connection error: ', e);
        });
    console.log(`ScratchNow Server Running! API Doc: ${PROTOCOL}://${myIp}:${PORT}/api-docs`);
});