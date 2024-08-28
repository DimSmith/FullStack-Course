import express, { NextFunction, Request, Response } from "express";
import { addFollower, deleteFollower, getFollowers, getFollowersCountPerVacation, getUserFollows } from "../logic/FollowersLogic";
import { verifyUser } from "../MiddleWare/verify-user";

const followersRouter = express.Router();

followersRouter.get(
    "/getFollowers",
    verifyUser,
    async(request: Request, response: Response, next: NextFunction)=>{
        try{
            const followers = await getFollowers();
            response.status(200).json(followers);
        }catch(err){
            next(err);
        }
});

followersRouter.get(
    "/getUserFollows/:userId",
    verifyUser,
    async(request: Request, response: Response, next: NextFunction)=>{
        try{
            const followers = await getUserFollows(+request.params.userId);
            response.status(200).json(followers);
        }catch(err){
            next(err);
        }
    }
);

followersRouter.get(
    "/getFollowersCountPerVacation",
    verifyUser,
    async(request: Request, response: Response, next: NextFunction)=>{
        try{
            const followers = await getFollowersCountPerVacation();
            response.status(200).json(followers);
        }catch(err){
            next(err);
        }
    }
);

followersRouter.post(
    "/addFollower",
    verifyUser,
    async(request: Request, response: Response, next: NextFunction)=>{
        try{
            const followers = await addFollower(request.body.vacationId, request.body.userId);
            response.status(200).json(followers);
        }catch(err){
            next(err);
        }
    }
);

followersRouter.delete(
    "/deleteFollower",
    verifyUser,
    async(request: Request, response: Response, next: NextFunction)=>{
        try{
            const followers = await deleteFollower(request.body.vacationId, request.body.userId);
            response.status(200).json(followers);
        }catch(err){
            next(err);
        }
    }
);

export default followersRouter;