import "./SingleMeeting.css";
import { Meeting } from "../../Modal/Meeting";

interface meetingProps{
    meeting:Meeting;
}

export function SingleMeeting(props:meetingProps): JSX.Element {

    const startDate = new Date(props.meeting.start).toISOString().slice(0, 19).replace('T', ' ');
    const finishDate = new Date(props.meeting.finish).toISOString().slice(0, 19).replace('T', ' ');
    const duration = (new Date(props.meeting.finish).getTime() - new Date(props.meeting.start).getTime()) / (3600000);

    return (
        <div className="SingleMeeting">
			<div className="Box">
                <p><b>Start:</b>{startDate}</p>
                <p><b>Finish:</b>{finishDate}</p>
                <p><b>Meeting Duration:</b>{duration} hrs</p>
                <p><b>Purpose:</b>{props.meeting.purpose}</p>
                <p><b>Room:</b>{props.meeting.room}</p>
            </div>
        </div>
    );
}
