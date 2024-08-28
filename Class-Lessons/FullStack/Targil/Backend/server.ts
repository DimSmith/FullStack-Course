import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config";
import ErrorHandler from "./MiddleWare/routeNotFound";
import { authorRouter, booksRouter } from "./Routes/myRoutes";

const server = express();
const isAdmin = false;

const corsOptions = {
    origin: "*", //allow any origin
    methods: ["GET","POST"], //which methods i will allow
    allowedHeaders: ["Content-Type","Authorization"], //which headers i will get
    exposedHeaders: ["Authorization"] //which headers i will expose
}

const serverCors = {
    origin: "192.168.60.53",
    methods: ["POST"],
    allowedHeaders: ["Content-Type","Authorization"],
    exposedHeaders: ["Authorization"]
}

server.use(cors(isAdmin?serverCors:corsOptions));

server.use(express.json());

server.use(fileUpload({createParentPath:true}));

server.use("/api/v1/authors", authorRouter);
server.use("/api/v1/books", booksRouter);

//404 handler
server.use("*",ErrorHandler);

//start the server
server.listen(config.webPort, ()=>{
    console.log(`listing on http://${config.webHost}:${config.webPort}`);
})