export class Book{
    id:number;
    authorID:number;
    bookName:string;
    totalPages:number;
    bookPrice:number;

    constructor(id:number,authorID:number,bookName:string,totalPages:number,bookPrice:number){
        this.id=id;
        this.authorID=authorID;
        this.bookName=bookName;
        this.totalPages=totalPages;
        this.bookPrice=bookPrice;
    }
}