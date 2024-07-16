// cp
import crypto from 'crypto';


// Function to generate a secure encryption key
const generateEncryptionKey = (length)=>{
    return crypto.randomBytes(length/2).toString('hex');
};

module.exports  = {generateEncryptionKey}