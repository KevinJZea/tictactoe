import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(PORT);

app.use(express.static(join(__dirname, '../client/dist')));
