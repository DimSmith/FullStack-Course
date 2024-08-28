import express , {NextFunction,Request,Response} from 'express';
import { addMeeting, getAllTeams, getMeetingsByTeamId  } from '../logic/MeetingLogic';
import { Meeting } from '../Models/Meeting';

const meetingRouter = express.Router();

//get all teams
//route = > http://localhost:8080/api/teams/all
meetingRouter.get("/teams/all",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const teams = await getAllTeams();
        response.status(200).json(teams);
    } catch (err){
        next (err); 
    }
})

//get meeting by team id
//route = > http://localhost:8080/api/meetings/teamId/:id
meetingRouter.get("/meetings/teamId/:id",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const meetings = await getMeetingsByTeamId(+request.params.id);
        response.status(200).json(meetings);
    } catch (err){
        next (err); 
    }
})


//post new meeting for the data base
//route = > http://localhost:8080/api/meetings/add
meetingRouter.post("/meetings/add",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const newMeeting = new Meeting(request.body.meetId,request.body.teamId,request.body.start,request.body.finish,request.body.purpose,request.body.room);
        const add = await addMeeting(newMeeting);
        response.status(200).json(add);
    } catch (err){
        next (err); 
    }
})


export default meetingRouter;
