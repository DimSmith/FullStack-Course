import express, {NextFunction,Request,Response} from 'express';
import operationLogic from '../logic/operationLogic';
import { AccountOperationModel } from '../Models/AccountOperation';
const accountRouter = express.Router();

accountRouter.get('/account/get/:accountNumber', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const operations = await operationLogic.getAllAccountOperationsByAccountNumber(accountNumber);
        res.json(operations);
    } catch (error) {
        next(error);
    }
});

accountRouter.post('/account/add/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAccountOperation = new AccountOperationModel(req.body);
        const addedAccountOperation = await operationLogic.addAccountOperation(newAccountOperation);
        res.status(201).json(addedAccountOperation);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default accountRouter;