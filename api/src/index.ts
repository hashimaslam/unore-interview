import bodyParser from 'body-parser';
import { Application } from 'express';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
const app: Application = express();
const PORT = 3000;
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
