import dal_mysql from "../DAL/dal_mysql";
import { UserCred } from "../Models/UserCred";
import { createJWT } from "../Utils/jwt";

const registerUser = async (user: UserCred) => {
    const checkEmailSql = `
        SELECT * FROM users
        WHERE userEmail = '${user.userEmail}'
    `;
    const emailCheck = await dal_mysql.execute(checkEmailSql);
    if (emailCheck.length > 0) {
        throw new Error("Email already exists");
    }

    const insertUserSql = `
        INSERT INTO users (userFname, userLname, userEmail, userPass, userAdmin)
        VALUES ('${user.userFname}','${user.userLname}','${user.userEmail}', '${user.userPass}','${user.userAdmin}')
    `;
    const result = await dal_mysql.execute(insertUserSql);
    if (result.affectedRows > 0) {
        const newUser = {
            userId: result.insertId,
            userFname: user.userFname,
            userLname: user.userLname,
            userEmail: user.userEmail,
            userAdmin: Number(user.userAdmin)
        };
        const token = createJWT(newUser);
        return { ...newUser, token };
    } else {
        throw new Error("Failed to register user");
    }
}

const loginUser = async(user: UserCred) => {
    const sql = `
    SELECT userId, userFname, userLname, userEmail, userAdmin FROM users
    WHERE userEmail = '${user.userEmail}' AND userPass = '${user.userPass}'
    `;
    const result = await dal_mysql.execute(sql);
    if (result.length > 0) {
        const userData = result[0];
        const token = createJWT({
            userId: userData.userId,
            userFname: userData.userFname,
            userLname: userData.userLname,
            userEmail: userData.userEmail,
            userAdmin: userData.userAdmin
        });
        return { message: "User logged in successfully", token };
    } else {
        throw new Error("Wrong email or password");
    }
}



export { registerUser,loginUser}; 