import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { loggerService } from './services/logger.service.js';
import { bugService } from './services/bug.service.js';

const app = express();

//* ------------------- Config -------------------
const corsOptions = {
   origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
   credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/api/bug', async (req, res) => {
   res.send(await bugService.query());
});
app.get('/api/bug/save', async (req, res) => {
   const { title, severiy } = req.query;
   res.send(
      await bugService.save({
         title: title,
         severiy: severiy,
         createadAt: Date.now(),
      })
   );
});
app.get('/api/bug/:bugId', async (req, res) => {
   res.send(await bugService.getById(req.params.bugId));
});
app.get('/api/bug/:bugId/remove', async (req, res) => {
   await bugService.remove(req.params.bugId);
});

const port = 3030;
app.listen(port, () => {
   loggerService.info(`Example app listening on port http://127.0.0.1:${port}/`);
});
