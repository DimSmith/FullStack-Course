import { SubmitHandler, useForm } from "react-hook-form";
import { Meeting } from "../../Modal/Meeting";
import "./AddMeeting.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type MeetingProps = {
    meeting: Meeting;
}

export function AddMeeting(): JSX.Element {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<MeetingProps>();
    
    const onSubmit:SubmitHandler<MeetingProps> = (data)=>{
        let sendData ={
            teamId:data.meeting.teamId,
            start:new Date(data.meeting.start).toISOString().slice(0, 19).replace('T', ' '),
            finish:new Date(data.meeting.finish).toISOString().slice(0, 19).replace('T', ' '),
            purpose:data.meeting.purpose,
            room:data.meeting.room,
        }
        
        axios.post("http://localhost:8080/api/meetings/add",sendData)
        .then (response=>{
            console.log("Meeting had Added");
            navigate("/");
            })
            .catch(err=>{
                console.log("error while adding");
                console.log(err);
            })
        };
    
    
    return (
        <div className="AddMeeting BoxForm" >
			<h1>Add New Meeting</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("meeting.teamId", { required: true })} type="text" placeholder="Enter the Team ID" />
                    {errors.meeting?.teamId?.type==="required" && <><br/><span style={{color:"red"}}>Team ID is required.</span></>}
                    <br/><br/>
                    <input {...register("meeting.start", { required: true ,min:0})} type="datetime-local" placeholder="Start Date" />
                    {errors.meeting?.start?.type==="required" && <><br/><span style={{color:"red"}}>Start Date is required</span></>}
                    <br/><br/>
                    <input {...register("meeting.finish", { required: true ,min:0})} type="datetime-local" placeholder="Finish Date" />
                    {errors.meeting?.finish?.type==="required" && <><br/><span style={{color:"red"}}>Finish Date is required</span></>}
                    <br/><br/>
                    <input {...register("meeting.purpose", { required: true})} placeholder="Enter the Purpose" />
                    {errors.meeting?.purpose?.type==="required" && <><br/><span style={{color:"red"}}>Purpose is required.</span></>}
                    <br/><br/>
                    <input {...register("meeting.room", { required: true })} type="text" placeholder="Enter the Room " />
                    {errors.meeting?.room?.type==="required" && <><br/><span style={{color:"red"}}>Room is required.</span></>}
                    <br/><br/>
                    <input type="submit" value="Add New Meeting"/>
            </form>
        </div>
    );
}
