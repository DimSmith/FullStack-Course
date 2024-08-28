export class Meeting{
    meetingId:number;
    teamId:number;
    start:Date;
    finish:Date;
    purpose:string;
    room:string;
    teamName:string;

    constructor(meetingId:number,teamId:number,start:Date,finish:Date,purpose:string,room:string,teamName:string){
        this.meetingId=meetingId;
        this.teamId=teamId;
        this.start=start;
        this.finish=finish;
        this.purpose=purpose;
        this.room=room;
        this.teamName=teamName;
    }
}