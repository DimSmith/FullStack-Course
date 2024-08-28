import cors from "cors";
import express from "express";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import serverRouter from "./Routes/servers";

const server = express();
const isAdmin = false;

server.use(cors());

server.use(express.json());

//using routes = > http://localhost:8080/api/
server.use("/api", serverRouter);

//404 handler
server.use("*",ErrorHandler);

//start the server
server.listen(config.webPort, ()=>{
    console.log (`listing on http://${config.webHost}:${config.webPort}`);
})