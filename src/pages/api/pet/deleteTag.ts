import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";
import { Wallet } from "@prisma/client";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Invalid session." });
  }

  try {
    const walletFinded: Wallet | null = await prisma.wallet.findUnique({
      where: {
        id: req.body.walletId[0],
      },
    });

    if (!walletFinded) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Wallet not found." });
    }

    const tagDeleted = walletFinded.tags.filter((tag) => {
      return tag !== req.body.tag;
    });

    const wallet = await prisma.wallet.update({
      where: {
        id: req.body.walletId[0],
      },
      data: {
        tags: tagDeleted,
      },
    });

    return res.status(200).json({ wallet });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
