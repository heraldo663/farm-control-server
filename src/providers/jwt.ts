import jwt from "jsonwebtoken";

export const encode = (
  ttl: string,
  secret: string,
  email: string,
  id: string | number,
  name: string
): string => {
  return jwt.sign({ id, email, name }, secret, {
    expiresIn: ttl,
  });
};

export const decode = (
  token: string,
  secret: string
): Promise<jwt.VerifyErrors | any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(null);
      }
      resolve(decoded);
    });
  });
};
