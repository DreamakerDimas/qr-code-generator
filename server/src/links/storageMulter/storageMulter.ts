import * as path from 'path';
import MulterGoogleStorage from 'multer-google-storage';
import { googleCloudSettings } from '../../constants';

export const getIdFromPath = (file) => {
  const fullFilename = file[0].filename; // get string
  return fullFilename.split('/')[1].split('.')[0]; // slice string
};

export const userStorageUpload = new MulterGoogleStorage({
  projectId: googleCloudSettings.projectId,
  keyFilename: path.join(__dirname, '../../../src/constants/keyFile.json'),
  bucket: googleCloudSettings.bucketName,
  filename: (req, file, cb) => {
    const fileNameSplit = file.originalname.split('.');
    const fileExt = fileNameSplit.pop();
    cb(null, `${req.user.id}/${Date.now()}-${req.user.id}.${fileExt}`);
  },
});

export const adminStorageUpload = new MulterGoogleStorage({
  projectId: googleCloudSettings.projectId,
  keyFilename: path.join(__dirname, '../../../src/constants/keyFile.json'),
  bucket: googleCloudSettings.bucketName,
  filename: (req, file, cb) => {
    const fileNameSplit = file.originalname.split('.');
    const fileExt = fileNameSplit.pop();
    cb(null, `${req.body.userId}/${Date.now()}-${req.body.userId}.${fileExt}`);
  },
});

export const userStorageDelete = new MulterGoogleStorage({
  projectId: googleCloudSettings.projectId,
  keyFilename: path.join(__dirname, '../../../src/constants/keyFile.json'),
  bucket: googleCloudSettings.bucketName,
});
