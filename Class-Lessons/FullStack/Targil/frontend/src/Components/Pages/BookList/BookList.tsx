import { useEffect, useState } from "react";
import { Book } from "../../Modal/Book";
import "./BookList.css";
import { SingleBook } from "../SingleBook/SingleBook";
import axios from "axios";


export function BookList(): JSX.Element {
    const [books,setBooks] = useState<Book[]>([]);
        useEffect(()=>{
            axios("http://localhost:8080/api/v1/books/all")
            .then(response=>response.data)
            .then(data=>{setBooks(data);
            //console.log(data);
            });
        },[]);
    return (
        <div className="BookList" >
			{books.map((item: Book)=><SingleBook key={item.bookId} book={item}/>)}
        </div>
    );
}
