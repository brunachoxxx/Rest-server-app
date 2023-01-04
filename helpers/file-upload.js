import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = (
  files,
  extentions = ["jpg", "png", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const name = file.name.split(".");
    const fileExt = name[name.length - 1].toLowerCase();

    if (!extentions.includes(fileExt)) {
      reject(
        `File extention ${fileExt} not valid, try one of this ${extentions}`
      );
    }

    const tempName = uuidv4() + "." + fileExt;

    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });
  });
};
