import { ICatModel } from '../Models/catMode_mongoDB';
import { ClientError, videoNotFound } from '../Models/ClientsErrors';
import { ISongModel, SongModel } from '../Models/SongMongoDB';
//CRUD => Create, Read, Update, Delete

//Create(sql:insert into songs)
const addSong = (newSong:ISongModel):Promise<ISongModel> => {
    const errors = newSong.validateSync();//before add data to mongoDB we need to check if the data is valid
    if(errors) throw new videoNotFound(errors.message);
    return newSong.save();
}

//Create category new item
const addCategory = (newCategory: ICatModel): Promise<ICatModel> => {
    const errors = newCategory.validateSync();
    if (errors) throw new videoNotFound(errors.message);
    return newCategory.save();
}

//Read
const getAllSongs = ():Promise<ISongModel[]> =>{
    return SongModel.find().populate("category").exec();
}

//select * from songs where id = ???
const getSongById = async (id: string): Promise<ISongModel> => {
    //const singleSong = await SongModel.findById(id).exec();
    const singleSong = await SongModel.findById(id).populate("category").exec();
    if (!singleSong) throw new videoNotFound(`id ${id} is not in the system`);
    return singleSong;
}

const getPartialSongInfo = (): Promise<ISongModel[]> => {
    return SongModel.find({}, { title: true, url: true, _id: false }).exec();
}

//Update
const updateSong = async (song: ISongModel): Promise<ISongModel> => {
    const errors = song.validateSync();
    if (errors) throw new ClientError(400, errors.toString());
    const updateSong = await SongModel.findByIdAndUpdate(song._id, song, { returnOriginal: false, }).exec();
    if (!updateSong) throw new videoNotFound(`video was not found by id: ${song._id}`);
    return updateSong;
}

//Delete

const deleteSong = async (id: string): Promise<void> => {
    const deleteSong = await SongModel.findByIdAndDelete(id).exec();
    if (!deleteSong) throw new ClientError(400, `${id} was not found....`);
}

export {
    addSong,
    addCategory,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong,
    getPartialSongInfo
}

/*
        SQL     : SELECT * FROM songs WHERE category=1;
        MongoDB : return SongModel.find({category:1}).exec();

        SQL     : SELECT * FROM songs WHERE category =10 AND name = 'Over the rainbow';
        MongoDB : return SongModel.find({category=10,name='Over the rainbow'}).exec();

        SQL     : SELECT * FROM songs WHERE category=5 OR name='zeev'
        MongoDB : return SongModel.find({$OR:[{category:10, name='zeev}]}).exec();
        
        SQL     : SELECT * FROM songs WHERE likes BETWEEN 1000 AND 2000
        MongoDB : return SongModel.find({likes:{$gte:1000,$lte:2000}}).exec();
        
        SQL     : SELECT category,name FROM songs WHERE category BETWEEN 1 AND 3;
        MongoDB : return SongModel.find({category:{$gte:1, $lte:3}},{name:true, category:true, _id:false}).exec();
        
        SQL     : SELECT * FROM songs WHERE category BETWEEN 1 AND 3 ORDER BY category ASC name DESC
        MongoDB : return SongModel.find({category:{$gte:1, $lte:3}},null,{sort:{category:1,name:-1}}).exec()
        
        SQL     : SELECT * FROM vacations LIMIT 30 SKIP 10
        MongoDB : return VacationsModel.find({},null,{limit:30, skip:10}).exec()
        
        SQL     : INNER JOIN - get all songs with category for each song
                : SELECT Songs.*, name as categoryName
                : FROM songs JOIN categories
                : ON songs.category=category.id
        MongoDB : return songModel.find({categoryId: ${ne:null}}).populate("category").exec();
        
        w3schools -> mongoDB
*/