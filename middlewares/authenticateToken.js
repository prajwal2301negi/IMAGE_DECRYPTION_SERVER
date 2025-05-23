import jwt from 'jsonwebtoken'
import { JWT_SECRETKEY } from '../config/serverConfig.js'

async function authenticateToken(req,res,next){
    try {
        // as client has sent token in headers
        const token = req.headers['x-access-token']
        if(!token){
            throw new Error("No Token Found")
        }  
        const decoded = jwt.verify(token,JWT_SECRETKEY)
        req.address=decoded.address;
        next()
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports={authenticateToken}




