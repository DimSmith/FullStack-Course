import { useNavigate } from "react-router-dom";
import "./DeleteBook.css";
import { useForm } from "react-hook-form";
import axios from "axios";

export function DeleteBook(): JSX.Element {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const bookDelete =  (data: any) => {
        axios.delete(`http://localhost:8080/api/v1/books/delete/${data.id}`)
        .then((response) => {
            //console.log("Book Deleted")
        })
        .catch((error) => {
            console.log(error)
        })
        navigate("/")
    }

    return (
        <div className="DeleteBook Box">
			<h2>Delete Book</h2>
            <hr />
            <form onSubmit={handleSubmit(bookDelete)}>
                <input type="text" {...register("id")} placeholder="Book ID" />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}
