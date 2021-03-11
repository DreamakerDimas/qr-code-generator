import * as path from 'path';
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const uploadFromBuffer = async (filename, buffer) => {
  const fileHandler = bucket.file(filename);
  const [fileExists] = await fileHandler.exists();

  if (!fileExists) return await fileHandler.save(buffer);
  return await new Promise((resolve, reject) => resolve(filename));
};

export const deleteFile = async (filename) => {
  const fileHandler = bucket.file(filename);
  await fileHandler.delete();
};

export const downloadFile = async (filename) => {
  const file = bucket.file(filename);
};
