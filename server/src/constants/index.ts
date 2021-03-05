export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const jwtConstants = {
  secret: 'TopSecretClassified_O5_Only',
};

export const googleCloudSettings = {
  projectId: 'authentic-reach-306608',
  bucketName: 'qr-code-generator-bucket',
};

export const storageURL =
  'https://qr-code-generator-bucket.storage.googleapis.com/';
