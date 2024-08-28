import { UploadedFile } from "express-fileupload";

export class VacInfo{
    public vacationId:number;
    public vacationDest:string;
    public vacationDesc:string;
    public vacationStart:string;
    public vacationEnd:string;
    public vacationPrice:number;
    public vacationImageName:string;
    public vacationImage:any;
    

    constructor(
        vacationId:number,
        vacationDest:string,
        vacationDesc:string,
        vacationStart:string,
        vacationEnd:string,
        vacationPrice:number,
        vacationImageName:string,
        vacationImage:any
    ){
        this.vacationId=vacationId;
        this.vacationDest=vacationDest;
        this.vacationDesc=vacationDesc;
        this.vacationStart=vacationStart;
        this.vacationEnd=vacationEnd;
        this.vacationPrice=vacationPrice;
        this.vacationImageName=vacationImageName;
        this.vacationImage=vacationImage;
    }
}