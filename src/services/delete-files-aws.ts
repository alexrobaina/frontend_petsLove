import * as dotenv from 'dotenv';
import aws from 'aws-sdk';
import { config } from '../config/config';

dotenv.config();

const deleteImage = async (images: any, folderBucketName: string) => {
  let objectImagesToDelete: any = [];

  try {
    aws.config.update({
      secretAccessKey: config.awsConfig.SECRET_ACCESS_KEY,
      accessKeyId: config.awsConfig.ACCESS_KEY_ID,
      region: config.awsConfig.REGION,
    });
    const s3 = new aws.S3();

    images.forEach((image: string) => {
      objectImagesToDelete.push({ Key: `${folderBucketName}/${image}` });
    });

    const params: any = {
      Bucket: `${config.awsConfig.BUCKET}`,
    };

    await s3.listObjects(params, function (err, data) {
      if (err) return console.log(err);

      params.Delete = { Objects: objectImagesToDelete };

      s3.deleteObjects(params)
        .promise()
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    });
  } catch (e) {
    console.log(e);
  }
};

export default deleteImage;
