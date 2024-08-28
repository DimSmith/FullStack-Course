import { getAllAuthors } from '../Logic/AuthorLogics';
import { addNewBook, deleteBook, getAllBooks } from '../Logic/BooksLogics';
import { Book } from '../Models/Book';
import express, {NextFunction,Request,Response} from 'express';

const booksRouter = express.Router();
const authorRouter = express.Router();

//author, aet all authors
//books, get all books,add new book,delete book


//http://127.0.0.1:8123/api/v1/authors/all
authorRouter.get("/all",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const authors = await getAllAuthors();
        response.status(200).json(authors);
    } catch (err){
        next (err); 
    }
})

booksRouter.get("/all",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const books = await getAllBooks();
        response.status(200).json(books);
    } catch (err){
        next (err); 
    }
})

booksRouter.post("/add",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        const newBook = new Book(request.body.id,request.body.authorID,request.body.bookName,request.body.totalPages,request.body.bookPrice);
        const addedBook = await addNewBook(newBook);
        response.status(201).json(addedBook);
    } catch (err){
        next (err); 
    }
})

booksRouter.delete("/delete/:id",async (request:Request,response:Response,next:NextFunction)=>{
    try{
        console.log(`deleting ${request.params.id}`)
        let data = await deleteBook(+request.params.id);
        console.log("data: ",data);
        response.status(200).json({msg:"Book have removed"});
    } catch (err){
        next (err); 
    }
})



export {authorRouter,booksRouter};