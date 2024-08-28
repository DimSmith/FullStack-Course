import express, {NextFunction,Request,Response} from 'express';
import customerLogic from '../logic/customerLogic';
const customerRouter = express.Router();

customerRouter.get("/all",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        //L O G I C !
        const customers = await customerLogic.getAllCustomers();
        //return the response from mysql database as json format
        response.status(200).json(customers);
    } catch (err){
        next (err);
    }
})

//16
customerRouter.get("/targil1",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        //L O G I C !
        const products = await customerLogic.getProducts();
        //return the response from mysql database as json format
        response.status(200).json(products);
    } catch (err){
        next (err);
    }
})

//19
customerRouter.get("/targil2",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        //L O G I C !
        const orders = await customerLogic.getOrders();
        //return the response from mysql database as json format
        response.status(200).json(orders);
    } catch (err){
        next (err);
    }
})

export default customerRouter;