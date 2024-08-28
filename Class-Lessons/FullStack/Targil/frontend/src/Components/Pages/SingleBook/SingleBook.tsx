import { Book } from "../../Modal/Book";
import "./SingleBook.css";

interface bookProps{
    book:Book;
}

export function SingleBook(props:bookProps): JSX.Element {
    return (
        <div className="SingleBook">
			<div className="SingleBook Box">
                <h2>{props.book.bookName}</h2><hr/>
                <h3>{props.book.firstName} {props.book.lastName}</h3>
                <p>{props.book.pages} pages</p>
                <p>{props.book.price} NIS</p>
            </div>
        </div>
    );
}
