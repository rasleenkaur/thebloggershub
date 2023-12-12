import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = `http://localhost:8000`

let gfs, gridfsbucket;  
const conn= mongoose.connection; 
conn.once('open', ()=>{
    gridfsbucket= new mongoose.mongo.GridFSBucket(conn.db,{ 
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})


export const uploadImage = (request,response)=>{
    if(!request.file){
        return response.status(400).json({msg: "File not found"});
    }
    const imageUrl = `${url}/file/${request.file.filename}`
    

    return response.status(200).json(imageUrl);
}

export const getImage= async(request,response) =>{  
    try{
        const file= await gfs.files.findOne({filename: request.params.filename});
        const readstream = gridfsbucket.openDownloadStream(file._id);
        readstream.pipe(response); 
    }
    catch(error){
        return response.status(500).json({msg: error.message})
    } 
}


  