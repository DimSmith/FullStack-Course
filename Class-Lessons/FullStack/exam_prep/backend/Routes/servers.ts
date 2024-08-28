import express , {NextFunction,Request,Response} from 'express';
import { changeStatus, getAllServers } from '../logic/ServerLogic';

const serverRouter = express.Router();

serverRouter.get("/all",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const servers = await getAllServers();
        response.status(200).json(servers);
    } catch (err){
        next (err); 
    }
})

serverRouter.post("/server/:id/:status",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        let id = +request.params.id;
        let status = +request.params.status;
        const newStatus = await changeStatus(id,status);
        response.status(200).json(newStatus);
    } catch (err){
        next (err); 
    }
})


export default serverRouter;
