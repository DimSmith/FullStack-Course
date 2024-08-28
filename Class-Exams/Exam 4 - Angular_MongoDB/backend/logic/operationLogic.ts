import { RouteNotFound } from '../Models/ClientsErrors';
import { AccountOperation, AccountOperationModel } from '../Models/AccountOperation';

const addAccountOperation = async (newAccountOperation: AccountOperation, operationDate?: Date) => {
    newAccountOperation.date = operationDate || new Date();
    const errors = newAccountOperation.validateSync();
    if (errors) throw new RouteNotFound(errors.message);
    return newAccountOperation.save();
}
const getAllAccountOperationsByAccountNumber = async (accountNumber: number): Promise<AccountOperation[]> => {
    return AccountOperationModel.find({ accountNumber }).exec();
}

export default {
    addAccountOperation,
    getAllAccountOperationsByAccountNumber,
}
