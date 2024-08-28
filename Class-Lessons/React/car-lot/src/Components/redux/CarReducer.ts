import { Car } from "../modal/Car";

export class CarState {
    public allCars:Car[] = [];
}

export enum CarActionType {
    addCar="addCar",
    deleteCar = "deleteCar",
    downloadCar = "downloadCar"
}

export interface CarAction {
    type: CarActionType;
    payload?: any;
}

export function addCarAction(newCar:Car):CarAction{
    return{type: CarActionType.addCar, payload:newCar}
}

export function deleteCarAction(mispar_rechev:number):CarAction{
    return{type: CarActionType.deleteCar}
}

export function downloadCarAction(allCars:Car[]):CarAction{
    return{type: CarActionType.downloadCar, payload:allCars}
}

export function CarReducer(
    currentState: CarState = new CarState(),
    action: CarAction): CarState
    {
        const newState = {...currentState};
        switch(action.type){
            case CarActionType.addCar:
                newState.allCars = [...newState.allCars,action.payload];
            break;
            case CarActionType.deleteCar:
                newState.allCars = [...newState.allCars].filter(
                    (item)=> item.mispar_rechev!==action.payload
                )
            break;
            case CarActionType.downloadCar:
                newState.allCars = action.payload;
            break;
        }

        return newState;
    }