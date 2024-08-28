import dal_mysql from "../DAL/dal_mysql";
import fs from 'fs';
import { VacInfo } from "../Models/VacInfo";
import { v4 as uuidv4 } from 'uuid';


//Get all vacations
const getVacations = async()=>{
    const sql = `
        SELECT * FROM \`vacations\`
        `;
    return await dal_mysql.execute(sql);
}

//Add new vacation
const addVacation = async(vacation: VacInfo) => {
    try {

        let startDate, finishDate;
        try {
            startDate = vacation.vacationStart;
            finishDate = vacation.vacationEnd;
        } catch (error) {
            throw new Error("Invalid date format for vacation start or end date");
        }
        let imageName: string;

        if (vacation.vacationImage && typeof vacation.vacationImage !== 'string') {
            const extension = vacation.vacationImage.name.substring(vacation.vacationImage.name.lastIndexOf('.'));
            imageName = uuidv4() + extension;
            await vacation.vacationImage.mv(`./Upload/images/${imageName}`);
        } else if (typeof vacation.vacationImage === 'string') {
            imageName = vacation.vacationImage;
        } else {
            throw new Error('Vacation image is required');
        }
    
    //Handle SQL
    const sql = `
        INSERT INTO vacations
        Values (0, '${vacation.vacationDest}', '${vacation.vacationDesc}','${startDate}'
        ,'${finishDate}','${vacation.vacationPrice}','${imageName}')
    `;
    return await dal_mysql.execute(sql);

} catch (error) {
    console.error("Error adding vacation:", error);
    throw error;
}
}

//Delete vacation
const deleteVacation = async (vacationId: number) => {
    try {
        const deleteFollowersSql = `DELETE FROM followers WHERE vacationId = ${vacationId}`;
        await dal_mysql.execute(deleteFollowersSql);

        const [vacation] = await getVacationById(vacationId) as [VacInfo];
        
        if (vacation && vacation.vacationImageName) {
            const imagePath = `./Upload/images/${vacation.vacationImageName}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`;
        const result = await dal_mysql.execute(sql);
        
        if (result.affectedRows === 0) {
            throw new Error(`Vacation with ID ${vacationId} not found`);
        }
        
        return true;
    } catch (err) {
        console.error("Error deleting vacation:", err);
        return false;
    }
}

//Get vacation by id
const getVacationById = async(vacationId: number)=>{
    const sql = `
        SELECT * FROM \`vacations\`
        WHERE vacationId = ${vacationId}
        `;
    return await dal_mysql.execute(sql);
}

//Update vacation
const updateVacation = async(vacationId: number, vacation: any) => {
    try {
        const startDate = new Date(vacation.startDate);
        const finishDate = new Date(vacation.endDate);
        const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
        const formattedFinishDate = finishDate.toISOString().slice(0, 19).replace('T', ' ');

        let newImageName = vacation.vacationImageName;
        const [currentVacation] = await getVacationById(vacationId) as [VacInfo];

        if (vacation.vacationImage) {
            if (currentVacation && currentVacation.vacationImageName) {
                const oldImagePath = `./Upload/images/${currentVacation.vacationImageName}`;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            const extension = vacation.vacationImage.name.substring(vacation.vacationImage.name.lastIndexOf('.'));
            newImageName = uuidv4() + extension;
            await vacation.vacationImage.mv(`./Upload/images/${newImageName}`);
        }

        const sql = `
            UPDATE vacations 
            SET vacationDest = '${vacation.destination}', vacationDesc = '${vacation.description}', vacationStart = '${formattedStartDate}',
                vacationEnd = '${formattedFinishDate}', vacationPrice = '${vacation.price}', vacationImageName = '${newImageName}'
            WHERE vacationId = ${vacationId}
        `;
        return await dal_mysql.execute(sql);
    } catch (error) {
        console.error("Error updating vacation:", error);
        throw error;
    }
}

export {getVacations,getVacationById,addVacation,deleteVacation,updateVacation};