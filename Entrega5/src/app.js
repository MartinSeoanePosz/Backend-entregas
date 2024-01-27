import express from 'express';
import { Server } from "socket.io";
import { __dirname } from './fileUtils.js';
import handlebars from "express-handlebars";
import connectMongo from './db/indexdb.js'
import { PORT, COOKIESECRET } from './config/indexconfig.js'
import sessionConfig from './config/sessionconfig.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from "./routes/viewsRouter.js";
// import loginRouter from "./routes/login.routes.js";
// import signupRouter from "./routes/signup.routes.js";
// import sessionRouter from "./routes/session.routes.js";
import { handleProductSocketEvents, handleChatSocketEvents } from './sockets/socketEvents.js';

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

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log("Server is running in port: " + PORT);
});

const socketServer = new Server(server);

socketServer.on('connection', (socket) => {
  //Products
  handleProductSocketEvents(socket);
  //Chats
  handleChatSocketEvents(socket);
});


connectMongo();