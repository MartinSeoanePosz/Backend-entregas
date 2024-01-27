import session from 'express-session';
import MongoStore from 'connect-mongo';
import { COOKIESECRET } from './indexconfig.js';

const sessionConfig = session({
  store:  MongoStore.create({
    mongoUrl: 'mongodb+srv://Admin:testproject@projectnodejs1.kppspr3.mongodb.net/projectnodejs1',
    ttl: 600,
  }),
  secret: COOKIESECRET,
  resave: false,
  saveUninitialized: true,
});

export default sessionConfig;