import "./TeamList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Team } from "../../Modal/Team";
import { SingleTeam } from "../SingleTeam/SingleTeam";

export function TeamList(): JSX.Element {
    const [team,setTeam]=useState<Team[]>([]);
    useEffect(()=>{
        axios("http://localhost:8080/api/teams/all")
        .then(response=>response.data)
        .then(data=>{setTeam(data);
        });
    },[]);
    return (
        <div className="TeamList">
			{team.map((item: Team)=><SingleTeam key={item.teamId} team={item}/>)}
        </div>
    );
}
