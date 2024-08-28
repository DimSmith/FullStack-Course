import { useEffect, useState } from "react";
import { Author } from "../../Modal/Author";
import "./AuthorList.css";
import axios from "axios";
import { SingleAuthor } from "../SingleAuthor/SingleAuthor";

export function AuthorList(): JSX.Element {
    const [author,setAuthor] = useState<Author[]>([]);
        useEffect(()=>{
            axios("http://localhost:8080/api/v1/authors/all")
            .then(response=>response.data)
            .then(data=>{setAuthor(data);
            console.log(data);
            });
        },[]);
    return (
        <div className="AuthorList">
			{author.map((item: Author)=><SingleAuthor key={item.authorID} author={item}/>)}
        </div>
    );
}
