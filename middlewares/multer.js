import multer from 'multer';

// we are using multer as to store image for sometime to multer and done its encryption

const storage = ()=> multer.memoryStorage();

module.exports = { UploadUserImage:multer({ storage:storage()}).single('file')};
