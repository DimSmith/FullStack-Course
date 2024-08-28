import dal_mysql from "../DAL/dal_mysql";

const getFollowers = async()=>{
    const sql = `
        SELECT * FROM \`followers\`
        `;
    return await dal_mysql.execute(sql);
}

const getUserFollows = async (userId: number) => {
    const sql = `
        SELECT * FROM \`followers\`
        WHERE userId = ${userId}
    `;
    return await dal_mysql.execute(sql);
}

const getFollowersCountPerVacation = async () => {
    const sql = `
        SELECT vacationId, COUNT(*) as follower_count
        FROM \`followers\`
        GROUP BY vacationId
        ORDER BY follower_count DESC
    `;
    return await dal_mysql.execute(sql);
}

const addFollower = async (vacationId: number, userId: number) => {
    const sql = `
        INSERT INTO \`followers\` (userId, vacationId)
        VALUES (${userId}, ${vacationId})
    `;
    return await dal_mysql.execute(sql);
}

const deleteFollower = async (vacationId: number, userId: number) => {
    const sql = `
        DELETE FROM \`followers\` WHERE userId = ${userId} AND vacationId = ${vacationId}
    `;
    return await dal_mysql.execute(sql);
}

export {getFollowers, getFollowersCountPerVacation, addFollower, deleteFollower, getUserFollows};