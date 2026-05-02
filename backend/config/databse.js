import mongoose from 'mongoose';
import { config } from './config.js';


function connectDatabase(){
    mongoose.connect(config.MONGODB_URI).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
});
}
export default connectDatabase;