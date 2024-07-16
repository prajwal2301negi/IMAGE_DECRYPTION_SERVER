import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authenticationRoute from './routes/authenticationRoute.js'
import uploadImageRoute from './routes/uploadImageRoute.js'
import { MONGODB_URL, PORT } from './config/serverConfig.js';
import { connectDB } from './db/connect.js'
import getImageRoute from './routes/getImageRoute.js'


dotenv.config();

app.use(cors());


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authenticationRoute);
app.use('/api', uploadImageRoute);
app.use('/api',getImageRoute)

async function serverStart() {
    try {
        await connectDB(MONGODB_URL)
        console.log("Connceted to database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`
            )
        })
    }
    catch (error) {
        console.log(error);
    }
}

serverStart();




// const PORT = process.env.PORT || 8000
// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })