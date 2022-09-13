import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Invalid session." });
  }

  if (!req.query.getId) {
    return res
      .status(404)
      .json({ statusCode: 400, message: "{Please send Id}." });
  }

  const id: any = req.query?.getId;

  try {
    const wallets = await prisma.pet.findUnique({
      where: { id },
    });
    res.status(200).json({ wallets });
  } catch (error) {
    res.status(500).json({ error });
  }
};
