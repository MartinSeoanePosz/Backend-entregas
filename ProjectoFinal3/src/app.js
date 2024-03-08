import express from 'express';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import passport from "passport";
import connectMongo from './db/indexdb.js'
import { PORT, COOKIESECRET } from './config/indexconfig.js'
import sessionConfig from './config/sessionconfig.js'
import initializePassport from './config/passportconfig.js';
import gitHubPassport from './config/gitHubPassport.js';
import { handleProductSocketEvents, handleChatSocketEvents } from './sockets/socketEvents.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from "./routes/viewsRouter.js";
import loginRouter from "./routes/loginRouter.js";
import signupRouter from "./routes/signupRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import { __dirname } from './fileUtils.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIESECRET));
app.use(sessionConfig);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initializePassport();
gitHubPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/", sessionRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);


const server = app.listen(PORT, () => {
  console.log("Server is running in port: " + PORT);
});

const socketServer = new Server(server);

socketServer.on('connection', (socket) => {
  handleProductSocketEvents(socket);
  handleChatSocketEvents(socket);
});


connectMongo();