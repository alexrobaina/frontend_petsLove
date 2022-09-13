import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

aws.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3: any = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.REACT_APP_AWS_BUCKET || "",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req: any, file: any, cb): any => {
      cb(null, {
        fieldName: `_petsLove_${uuidv4()}_${path.extname(file.originalname)}`,
      });
    },
    key: (req: any, file: any, cb): any => {
      cb(null, `_petsLove_${uuidv4()}_${path.extname(file.originalname)}`);
    },
  }),
});

export default upload;
