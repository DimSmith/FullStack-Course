import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import MainMenu from '../MainMenu/MainMenu';

//to use forms,install: npm install react-hook-form
//useForm Site

//userName: String , userPassword: String
//type - is not class and  is not interface, type is like object, whe can give any name we want to  type
type formInputs={
    userName: String
    userPassword: String
    userAddress: String
    userAge: number
    userCity : String
    userCountry: String
    userLocation: String
}

function Login(): JSX.Element {
    //declare which functions we will use from useForm,and thr structure of inputs(string,number,boolean,etc..)
    const {register,handleSubmit,watch,formState:{errors}} = useForm<formInputs>();

    const onSubmit:SubmitHandler<formInputs> = (data) =>{
        console.log(data);
    }

    /*
    console.log(watch("userName"));//watch the user name value when passing data  into it
    //study case:
    */

    return (
        <div className="Login Box">
			{/*<h2>Login Form</h2><hr/>*/}
            <h2>Registration Form</h2><hr/>
            {/*handle submit, will check that there is no error when submitting*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*register our input to our useForm hook*/}
                <input type="text" placeholder="Enter Username" {...register("userName",{
                    required:true,
                    minLength:8,
                    maxLength:16,
                    })}/><br/>
                {errors.userName?.type==="required" && <span className="ErrorText"> Required filled</span>}<br/>
                {errors.userName?.type==="minLength" && <span className="ErrorText">Minimum 8 charts</span>}<br/>
                {errors.userName?.type==="maxLength" && <span className="ErrorText">Maximum 16 charts</span>}<br/>
                {/*register our input and validate it before sending,display an error,if they is any validation violation*/}
                
                <select>
                    <option value="north">Tzafon</option>
                    <option value="center">Merkaz</option>
                    <option value="west">Darom</option>
                    <option value="eilat">Eilat</option>
                </select>
                <br/><br/>
                <input type="password" placeholder="Enter Password" {...register("userPassword",{
                    required:true, 
                    minLength:8,
                    maxLength:16,
                })}/><br/>
                {errors.userPassword?.type==="required" && <span className="ErrorText"> Required filled</span>}<br/>
                {errors.userPassword?.type==="minLength" && <span className="ErrorText">Minimum 8 charts</span>}<br/>
                {errors.userPassword?.type==="maxLength" && <span className="ErrorText">Maximum 16 charts</span>}<br/>

                {/* we need to display an error if there is an error, don't display if all is ok"*/}
                {/*{errors.userPassword && errors.userName && <span className="ErrorText"> Fill the field</span>}<br/>*/}

                <input type="text" placeholder="Enter Living Address" {...register("userAddress",{
                    required:true,
                    minLength:5,
                    })}/><br/>
                {errors.userAddress?.type==="required" && <span className="ErrorText"> Required filled</span>}<br/>
                {errors.userAddress?.type==="minLength" && <span className="ErrorText">Minimum 5 charts</span>}<br/>

                <input type="number" placeholder="What is your age" {...register("userAge",{
                    required:true,
                    min:18,
                    max:120,
                    })}/><br/>
                {errors.userAge?.type==="required" && <span className="ErrorText"> Required filled</span>}<br/>
                {errors.userAge?.type==="min" && <span className="ErrorText">Minimum age 18</span>}<br/>
                {errors.userAge?.type==="max" && <span className="ErrorText">Maximum age 120</span>}<br/>

                <input type="text" placeholder="What is your City of Living" {...register("userCity")}/><br/><br/>
                <input type="text" placeholder="What is your Country of Living" {...register("userCountry")}/><br/><br/>
                <input type="submit" value="Login" /><br/>
            </form>
        </div>
    );
}

export default Login;
