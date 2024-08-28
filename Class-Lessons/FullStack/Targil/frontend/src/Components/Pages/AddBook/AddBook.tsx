import { useEffect, useState } from "react";
import "./AddBook.css";
import { Author } from "../../Modal/Author";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type bookData = {
    bookName:string,
    totalPages:number,
    bookPrice:number,
    authorName:string,
    authorID:number,
}

export function AddBook(): JSX.Element {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<bookData>();
    const [authors,setAuthors]=useState<Author[]>([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/api/v1/authors/all")
        .then(response=>response.data)
        .then(data=>setAuthors(data));
    },[]);

    const onSubmit:SubmitHandler<bookData> = (bookd)=>{
        let authorID=0;
        authors.forEach((item)=>{
            if (`${item.firstName} ${item.lastName}` === bookd.authorName) {
                authorID=item.authorID;
            };
        })
        console.log(authorID);
        let sendData = {
            authorID:authorID,
            bookName:bookd.bookName,
            totalPages:bookd.totalPages,
            bookPrice:bookd.bookPrice,
        }
        console.log(sendData);

        axios.post("http://localhost:8080/api/v1/books/add",sendData)
        .then (res=>{
            console.log("book was added");
            //navigate("/");
            })
            .catch(err=>{
                console.log("error while adding book");
                console.log(err);
            })
        };
    
    
    return (
        <div className="AddBook Box">
			<h1>Add Book</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("bookName", { required: true })} type="text" placeholder="Book Name" />
                    {errors.bookName?.type==="required" && <><br/><span style={{color:"red"}}>Book name is required.</span></>}
                    <br/><br/>
                    <input {...register("totalPages", { required: true ,min:0})} type="number" placeholder="Total Pages" />
                    {errors.totalPages?.type==="required" && <><br/><span style={{color:"red"}}>Book pages is required</span></>}
                    {errors.totalPages?.type==="min" && <><br/><span style={{color:"red"}}>Book pages can not be negative</span></>}
                    <br/><br/>
                    <input {...register("bookPrice", { required: true ,min:0})} type="number" placeholder="Book Price" />
                    {errors.bookPrice?.type==="required" && <><br/><span style={{color:"red"}}>Book price is required.</span></>}
                    {errors.bookPrice?.type==="min" && <><br/><span style={{color:"red"}}>Book pages can not be negative</span></>}
                    <br/><br/>
                    <select {...register("authorName",  { required: true })}>
                        {authors.map((item, index) => <option key={index}>{item.firstName} {item.lastName}</option>)}
                    </select>
                    <br/><br/>
                    <input type="submit" value="Add Book"/>
                </form>
        </div>
    );
}
