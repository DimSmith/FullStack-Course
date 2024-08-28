import express from "express";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import dal__mongodb from "./DAL/dal_mongodb";
import accountRouter from "./Routes/operations";
const server = express();

server.use(express.json());

server.use("/api",accountRouter);
server.use("*",ErrorHandler);

dal__mongodb.connect();

server.listen(config.webPort, () => {
    console.log(`listing on http://${config.webHost}:${config.webPort}`);
})



