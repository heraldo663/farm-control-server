import bcrypt from "bcryptjs";
import util from "util";


export async function compare(password: string, hash: string): Promise<boolean> {
  const compare = util.promisify(bcrypt.compare);
  return compare(password, hash);
}

export async function hash(password: string): Promise<string> {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return rej(err);
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return rej(err);
        res(hash);
      });
    });
  });
}

