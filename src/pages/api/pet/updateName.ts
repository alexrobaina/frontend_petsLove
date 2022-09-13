import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }

  try {
    const wallet = await prisma.wallet.update({
      where: {
        id: req.body.id[0],
      },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json({ wallet });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
