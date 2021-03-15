import { Storage } from '@google-cloud/storage';

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

export const deleteAllUserFiles = async (linksArr) => {
  await linksArr.forEach(async (link) => {
    await deleteFile(link.filename);
  });
};
