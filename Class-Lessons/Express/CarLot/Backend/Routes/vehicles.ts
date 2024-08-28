//getting the methods we need
import express , {NextFunction,Request,Response} from 'express';
import { addCar,soldCar,searchCarByPrice,searchCarByManufacturer,searchCarByModel,listSoldCar} from '../Logic/CarLotLogic';

const carRouter = express.Router();

carRouter.get(
    "/addCar/:number/:price/:yad/:km",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        const { number, price, yad, km } = request.params;
        response.status(200).json(addCar(number, Number(price), Number(yad), Number(km)));
    }
)

carRouter.get(
    "/soldCar/:number",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        response.status(200).json(soldCar(request.params.id));
    }
)

carRouter.get(
    "/searchCarByPrice/:lowPrice/:highPrice",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        const { lowPrice, highPrice } = request.params;
        const numericLowPrice = Number(lowPrice);
        const numericHighPrice = Number(highPrice);
        response.status(200).json(searchCarByPrice(numericLowPrice, numericHighPrice));
    }
)
carRouter.get(
    "/searchCarByManufacturer/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        response.status(200).json(searchCarByManufacturer(request.params.id));
    }
)

carRouter.get(
    "/searchCarByModel/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        response.status(200).json(searchCarByModel(request.params.id));
    }
)

carRouter.get(
    "/listSoldCar/",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        response.status(200).json(listSoldCar());
    }
)

export default carRouter;

