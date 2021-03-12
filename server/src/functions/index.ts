import * as bcrypt from 'bcrypt';

const saltNum = Number(process.env.BCRYPT_SALT);

export const hash = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(saltNum);

    const hash = await bcrypt.hash(pass, salt);

    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const checkPass = async (pass, hashedPass) => {
  try {
    const hash = await bcrypt.compare(pass, hashedPass);

    return hash;
  } catch (error) {
    console.log(error);
  }
};
