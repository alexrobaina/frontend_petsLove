import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "next-auth/react";
import aws from "aws-sdk";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  try {
    if (!session) {
      res.status(400).json({ statusCode: 400, message: "Invalid session." });
      return;
    }

    aws.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
      signatureVersion: "v4",
    });

    const s3 = new aws.S3();

    const response = await s3.createPresignedPost({
      Bucket: process.env.REACT_APP_AWS_BUCKET,
      Fields: {
        key: `${req.query.bucketFolder}/${uuidv4()}_${req.query.file}`,
        acl: "public-read",
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
