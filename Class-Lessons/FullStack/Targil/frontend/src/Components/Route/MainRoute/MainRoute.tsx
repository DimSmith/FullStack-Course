import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Page404 } from "../../Pages/Page404/Page404";
import { MainPage } from "../../Layout/MainPage/MainPage";
import { AddBook } from "../../Pages/AddBook/AddBook";
import { BookList } from "../../Pages/BookList/BookList";
import { AuthorList } from "../../Pages/AuthorList/AuthorList";
import { DeleteBook } from "../../Pages/DeleteBook/DeleteBook";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/addBook" element={<AddBook/>}/>
                <Route path="/bookList" element={<BookList/>}/>
                <Route path="/deleteBook" element={<DeleteBook/>}/>
                <Route path="/authorsList" element={<AuthorList/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
