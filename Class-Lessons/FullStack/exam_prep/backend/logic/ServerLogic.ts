import dal_mysql from "../DAL/dal_mysql";


const getAllServers = async()=>{
    //SQL statement
    const sql = `
        SELECT * 
        FROM \`servers\`.\`server\`
        INNER JOIN \`servers\`.\`company\`
        ON \`server\`.company_id = \`company\`.id
    `;
    //execute the sql command
    const allServers = await dal_mysql.execute(sql);
    //return the result
    return allServers;
}

const changeStatus = async(id:number,status:number)=>{
    //SQL statement
    const sql = `
        UPDATE \`server\` 
        SET status = ${status}
        WHERE id = ${id};
    `;
    //execute the sql command
    const serverStatus = await dal_mysql.execute(sql);
    //return the result
    return serverStatus;
}

export  {
    getAllServers,
    changeStatus
}