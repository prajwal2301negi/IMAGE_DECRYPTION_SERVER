import ethers from 'ethers';
import UserModel from '../models/user.js';
import { PINATA_APIKEY, PINATA_SECRETKEY } from '../config/serverConfig.js'
import {generateEncryptionKey} from '../utils/generateKey.js'
import encryptFile from '../utils/encryption.js'



async function uploadImageController(req, res, next) {
    try {
        //This will have our file
        // console.log(req.file);

        const address = req.address;
        const userAddress = address.toLowerCase();
        const user = await UserModel.findOne({ userAddress: userAddress });
        if(!user){
            throw new Error( "User not found" )
        }

        // If user is coming 1st time, generate its encryptionKey
        if(user.encryptionKey === null){
            const encryptionKey = await generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }

        // If user has already visited, we will use encryptionKey to encrypt the file
        const {encryptedData, iv} = encryptFile(req.file.buffer, user.encryptionKey)


        
        // Use the api keys by specifying your api key and api secret
        const pinataSDK = require('@pinata/sdk');
        const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETKEY });
        // const res = await pinata.testAuthentication()
        
        // Sending encrypted data to IPFS (pinata method)
        const resPinata = await pinata.pinJSONToIPFS({encryptedData,iv})
        
        // Sending ipfs hash to client 
        res.status(200).json({ipfsHash:resPinata.ipfsHash,message:"Image Uploaded"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { uploadImageController }
