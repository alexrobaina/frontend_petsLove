import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import upload from "services/file-upload";
import { Role } from "@prisma/client";

const uploadFiles = upload.array("newImages");

const handler = nc()
  .use(uploadFiles)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session: any = await getSession({ req });

    if (!session) {
      res.status(400).json({ statusCode: 400, message: "Invalid session." });
      return;
    }

    const imagesUrls: any = [];
    // @ts-ignore
    if (req.files.length > 0) {
      // @ts-ignore
      req.files.forEach((file: any) => {
        imagesUrls.push(file.key);
      });
    }

    const data = {
      userId: session.user.id,
      lat: `${req.body.lat}`,
      lng: `${req.body.lng}`,
      birthday: new Date(req.body.birthday),
      name: req.body.name.toLowerCase(),
      city: req.body.city,
      images: imagesUrls,
      sex: req.body.sex,
      adopted: false,
      country: req.body.country,
      adopterUserEmail: "",
      category: req.body.category,
      textAddress: req.body.textAddress,
      description: req.body.description,
      medicalNote: req.body.medicalNotes,
    };

    if (session.user.role === Role.ADOPTER) {
      data.adopterUserEmail = session.user.email;
      data.adopted = true;
    }

    try {
      const pet = await prisma.pet.create({
        data,
      });
      return res.status(200).json({ pet: pet });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error });
    }
  })
  .patch(async (req, res) => {
    console.log(req);
  });
export default handler;

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
