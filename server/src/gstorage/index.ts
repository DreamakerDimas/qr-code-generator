import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const isExist = async (filename) => {
  const fileHandler = bucket.file(filename);
  const [fileExists] = await fileHandler.exists();
  return fileExists;
};

export const uploadFromBuffer = async (filename, buffer) => {
  const fileHandler = bucket.file(filename);

  if (isExist) return await fileHandler.save(buffer);
  return await new Promise((resolve, reject) => resolve(filename));
};

export const waitForUpload = async (filename) => {
  return new Promise((resolve, reject) => {
    let i = 6;
    const check = async () => {
      const isUploaded = await isExist(filename);

      if (isUploaded) {
        resolve(true);
        return;
      }
      if (i--) {
        setTimeout(await check, 200);
      }
    };
    check();
  });
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
