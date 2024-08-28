import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config";
import loginRouter from "./Routes/login";
import vacationRouter from "./Routes/vacation";
import followersRouter from "./Routes/followers";
import { globalErrorHandler, routeNotFoundHandler } from "./MiddleWare/routeNotFound";

const cors = require('cors');
const server = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","Origin", "X-Requested-With", "Accept"],
    exposedHeaders: ["Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    debug: true
};

server.use('*', cors(corsOptions));

server.use(express.json());

server.use(express.static("upload"));
server.use(fileUpload({
    createParentPath:true,
    limits: { fileSize: 10 * 1024 * 1024 },
}));

server.use("/api/user", loginRouter);
server.use("/api/vacation", vacationRouter);
server.use("/api/followers", followersRouter);

// Use the route not found handler
server.use(routeNotFoundHandler);

// Use the global error handler
server.use(globalErrorHandler);

server.listen(config.webPort, () => {
    console.log(`Listening on http://${config.webHost}:${config.webPort}`);
});