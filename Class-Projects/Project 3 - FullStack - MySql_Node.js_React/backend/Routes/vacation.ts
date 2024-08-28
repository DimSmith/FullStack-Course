import express, { NextFunction, Request, Response } from "express";
import path from 'path';
import { getVacations,getVacationById,addVacation,updateVacation,deleteVacation} from "../logic/VacationLogic";
import { VacInfo } from "../Models/VacInfo";
import { verifyUser } from "../MiddleWare/verify-user";

const vacationRouter = express.Router();

//add vacation
vacationRouter.post(
    "/addVacation",
    verifyUser,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            let startDate = new Date(request.body.startDate).toISOString().slice(0, 10);
            let endDate = new Date(request.body.endDate).toISOString().slice(0, 10);
            const vacationData: VacInfo = {
                vacationId: 0,
                vacationDest: request.body.destination,
                vacationDesc: request.body.description,
                vacationStart: startDate,
                vacationEnd: endDate,
                vacationImageName: request.files?.vacationImage ? (request.files.vacationImage as any).filename : '',
                vacationPrice: parseFloat(request.body.price),
                vacationImage: request.files?.vacationImage
            };
            const result = await addVacation(vacationData);
            response.status(201).json({ 
                message: "Vacation has been added successfully",
                data: result
            });
        } catch (err) {
            console.error("Error in addVacation route:", err);
            if (err instanceof Error) {
                response.status(400).json({ error: err.message });
            } else {
                response.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }
);

//get all vacations
vacationRouter.get(
    "/getVacations",
    verifyUser,
    async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const vacations = await getVacations();
        response.status(200).json(vacations);
    } catch (err){
        next (err); 
    }
});

//get vacation by id
vacationRouter.get(
    "/getVacationById/:id",
    verifyUser,
    async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const vacation = await getVacationById(+request.params.id);
        response.status(200).json(vacation);
    } catch (err){
        next (err); 
    }
});

//update vacation
vacationRouter.put(
    "/updateVacation/:id",
    verifyUser,
    async (request: Request, response: Response, next: NextFunction) => {
    try {

        let vacationData = request.body;
        if (request.files && request.files.vacationImage) {
            vacationData.vacationImage = request.files.vacationImage;
        }
        const updatedVacation = await updateVacation(+request.params.id, vacationData);
        
        response.status(200).json({ 
            message: "Vacation has been updated successfully",
            data: updatedVacation
        });
    } catch (err) {
        console.error("Error in updateVacation route:", err);
        next(err);
    }
})

//delete vacation
vacationRouter.delete(
    "/deleteVacation/:id",
    verifyUser,
    async (request: Request, response: Response, next: NextFunction) => {
    try{
        let data = await deleteVacation(+request.params.id) ;
        response.status(200).json({msg:"Vacation have removed"});
        }
    catch(err){
        next(err);
    }
    }
);

//export image
vacationRouter.get("/getImage/:imageName",
    verifyUser,
    (request:Request,response:Response,next:NextFunction)=>{
    try{
        const imageName = request.params.imageName;
        const imagePath = path.join(__dirname,"..","Upload","images",imageName);
        response.sendFile(imagePath);
    }catch(err){
        next(err);
    }
});
export default vacationRouter;

