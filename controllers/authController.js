import ethers from 'ethers';
import  UserModel  from '../models/user.js';
import jwt from 'jsonwebtoken'
import {JWT_SECRETKEY} from '../config/serverConfig.js'

async function authController(req, res, next) {
    try {
        const { signature } = req.body;
        const { address } = req.query;
        if (!signature) {
            throw new Error("Signature is invalid")
        }

        // this is account that is use by client
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to Crypto Vault Website", signature);
        
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({ userAddress: address });
            if (!user) {
                const userData = await UserModel.create({
                    userAddress: address,
                })
            }
            const token = jwt.sign({
                address
            },JWT_SECRETKEY);

            res.status(200).json({ message: "Authentication Successfull",token });
        }
        else {
            // will display on client console
            res.status(400).json({ message: "Authentication Failed" });
        }


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports = { authController }
