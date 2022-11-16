import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const jwtGen = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log("err");
          reject("Token Fail");
        } else {
          resolve(token);
        }
      }
    );
  });
};
