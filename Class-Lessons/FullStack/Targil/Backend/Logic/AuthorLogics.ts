import dal_mysql from "../dal/dal_mysql";

//SELECT EXAMPLES
const getAllAuthors = async()=>{
    //SQL statement
    const sql = "SELECT * FROM authors";
    //return the result
    return await dal_mysql.execute(sql);
}

export {getAllAuthors};