import mongoose from 'mongoose';

const connectDB = (url)=>{
    return mongoose.connect(url);
}
module.exports = {connectDB}