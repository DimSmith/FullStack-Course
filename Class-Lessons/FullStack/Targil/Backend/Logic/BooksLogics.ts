import dal_mysql from "../dal/dal_mysql";
import { Book } from "../Models/Book";

//SELECT EXAMPLES
const getAllBooks = async()=>{
    //SQL statement
    const sql = `
        SELECT *,\`authors\`.firstName,\`authors\`.lastName 
        FROM \`books\`
        INNER JOIN \`authors\`
        ON \`books\`.authorID = \`authors\`.authorID
    `;
    //return the result
    return await dal_mysql.execute(sql);
}

const addNewBook = async(newBook:Book)=>{
    
    const sql =`
    INSERT INTO \`books\` (bookID, authorID ,bookName,pages,price)
    VALUES (0, ${newBook.authorID}, '${newBook.bookName}', ${newBook.totalPages}, ${newBook.bookPrice})
    `;
    return await dal_mysql.execute(sql);
}

const deleteBook =async (bookId: number) => {
    try {
        const sql = `DELETE FROM books WHERE bookId=${bookId}`;
        console.log(sql);
        await dal_mysql.execute(sql);
        return true;
    } catch (err) {
        console.log(err);
    }
};

export {getAllBooks,addNewBook,deleteBook};