export class Vacation{
    public vacationId:number;
    public vacationDest:string;
    public vacationDesc:string;
    public vacationStart:string;
    public vacationEnd:string;
    public vacationPrice:number;
    public vacationImageName:string;
    public vacationImage:File;
    

    constructor(vacationId:number,vacationDest:string,vacationDesc:string,vacationStart:string,vacationEnd:string,vacationPrice:number,vacationImage:File,vacationImageName:string){
        this.vacationId=vacationId;
        this.vacationDest=vacationDest;
        this.vacationDesc=vacationDesc;
        this.vacationStart=vacationStart;
        this.vacationEnd=vacationEnd;
        this.vacationPrice=vacationPrice;
        this.vacationImage=vacationImage;
        this.vacationImageName=vacationImageName;
    }
}