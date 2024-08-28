import "./SingleTeam.css";

import { Team } from "../../Modal/Team";

interface teamProps{
    team:Team;
}

export function SingleTeam(props:teamProps): JSX.Element {
    return (
        <div className="SingleTeam">
			<div className="Box">
                <h2>{props.team.teamName} Team</h2>
                <h3>Team ID:{props.team.teamId}</h3>
            </div>
        </div>
    );
}
