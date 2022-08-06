import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as path from 'path';

const app = express();

app.use(express.json());

const swaggerSpec = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req: Request, res: Response) => { res.send('ScratchNow Server Running!'); });

const PORT = 2208;
app.listen(PORT, () => {
    console.log(`ScratchNow Server Running at port ${PORT}`);
})