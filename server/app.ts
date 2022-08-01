import express, { Request, Response } from "express";
// import { swaggerUi, specs } from './src/swagger';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as path from 'path';

const app = express();

// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs, { explorer: true })
// );

const swaggerSpec = YAML.load(path.join(__dirname, './src/swagger/swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req: Request, res: Response) => { res.send('ScratchNow Server Running!'); });

app.listen(2208)