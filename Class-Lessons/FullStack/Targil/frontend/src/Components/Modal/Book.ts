export class Book{
    bookId:number;
    bookName:string;
    pages:number;
    price:number;
    firstName:string;
    lastName:string;
    authorID:number;

    constructor(bookId:number,bookName:string,pages:number,price:number,firstName:string,lastName:string,authorID:number){
        this.bookId=bookId;
        this.bookName=bookName;
        this.pages=pages;
        this.price=price;
        this.firstName=firstName;
        this.lastName=lastName;
        this.authorID=authorID;
    }
}