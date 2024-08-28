import dal_mysql from "../DAL/dal_mysql";
import { Meeting } from "../Models/Meeting";

//Get all teams
const getAllTeams = async()=>{
    const sql = `
        SELECT * 
        FROM \`teams\`
    `;
    return await dal_mysql.execute(sql);
}

//Get meetings by team id
const getMeetingsByTeamId = async(teamId:number)=>{
    const sql = `
        SELECT * 
        FROM \`meetings\`
        WHERE \`meetings\`.teamId = ${teamId};
    `;
    return await dal_mysql.execute(sql);
}

//Add meeting
const addMeeting = async(newMeeting:Meeting)=>{
    //convert the date format from JSON to SQL
    const startDate = new Date(newMeeting.start).toISOString().slice(0, 19).replace('T', ' ');
    const finishDate = new Date(newMeeting.finish).toISOString().slice(0, 19).replace('T', ' ');

    const sql =`
    INSERT INTO \`meetings\` (meetingId, teamId ,start,finish,purpose,room)
    VALUES (0, ${newMeeting.teamId}, '${startDate}', '${finishDate}', '${newMeeting.purpose}', '${newMeeting.room}')
    `;
    return await dal_mysql.execute(sql);
}

export  {
    getAllTeams,
    getMeetingsByTeamId,
    addMeeting
}