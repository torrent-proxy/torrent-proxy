import Router from './service/api/router';
import PopcornTimeApi from './service/external-api/popcorn-time';
import TorrentProxy from './service/loader';
import Transport from './service/api/transport';
import config from './service/config/config';

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')();
const app = express();

const popcornTimeTransport = new Transport(config.externalApi.popcorn.url);
const popcornTimeApi = new PopcornTimeApi(popcornTimeTransport);
const torrentProxy = new TorrentProxy(config.torrentServer);

app.use(cors);
app.routes = new Router(app, torrentProxy, popcornTimeApi);


exports.api = functions.https.onRequest(app);
