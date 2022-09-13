import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pets = await prisma.pet.findMany({});

    res.status(200).json({ pets });
  } catch (error) {
    res.status(500).json({ error });
  }
};
