import mongoose from "mongoose"


const Connection = async (username, password) =>{
    const URL=  `mongodb+srv://${username}:${password}@blog-app.tbqubwz.mongodb.net/?retryWrites=true&w=majority`;
   
    try{
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log(`Database connected successfully`);
    }
    catch(error){
        console.log(`Error while connecting with the database.`)
    }
}

export default Connection;