import { useEffect, useState } from "react";
import "./MeetingsID.css";
import axios from "axios";
import { Team } from "../../Modal/Team";
import { SubmitHandler, useForm } from "react-hook-form";
import { Meeting } from "../../Modal/Meeting";
import { SingleMeeting } from "../SingleMeeting/SingleMeeting";

export function MeetingsID(): JSX.Element {
    const [team,setTeam]=useState<Team[]>([]);
    const [meeting,setMeeting]=useState<Meeting[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<Team>();
    //Getting the all teams for the Select option
    useEffect(()=>{
        axios("http://localhost:8080/api/teams/all")
        .then(response=>response.data)
        .then(data=>{setTeam(data);
        });
    },[]);

    const onSubmit:SubmitHandler<Team>=(data)=>{
        
        //Converting the team Name for ID for search
        let teamID=0;
        team.forEach((item)=>{
            if (item.teamName === data.teamName) {
                teamID=item.teamId;
            };
        }) 
        
        //Getting the data from our database
        axios.get("http://localhost:8080/api/meetings/teamId/"+teamID)
        .then(response=>response.data)
        .then(data=>{setMeeting(data);
        });

    }
    return (
        <div className="MeetingsID">
            <div className="SelectForm">
                <h2>Select Team:</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("teamName",  { required: true })}>
                        {team.map((item, index) => <option key={index} value={item.teamName}>{item.teamName}</option>)}
                    </select>
                    <br/><br/>
                    <input type="submit" value="Show The Meetings"/>
                    </form>
                <hr/>
            </div>
            <div>
                {meeting.length > 0 && <h2>The Meetings:</h2>}
                {meeting.map((item: Meeting) => <SingleMeeting key={item.meetingId} meeting={item} />)}
            </div>
        </div>
    );
}