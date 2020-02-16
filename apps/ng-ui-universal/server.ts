import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

// import { AppServerModule } from './src/main.server';
const {
  AppServerModule
} = require('../../dist/apps/ng-ui-universal/server/main');
import { APP_BASE_HREF } from '@angular/common';

const server = express();
const distFolder = join(process.cwd(), 'dist/apps/ng-ui-universal/browser');

server.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule
  })
);
server.set('view engine', 'html');
server.set('views', distFolder);

// TODO: implement data requests securely
server.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Serve static files from /browser
server.get(
  '*.*',
  express.static(distFolder, {
    maxAge: '1y'
  })
);

// All regular routes use the Universal engine
server.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
  });
});

const port = process.env.PORT || 4000;

// Start up the Node server
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
