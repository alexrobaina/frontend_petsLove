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
    let result = await Promise.all(
      req.body.wallets.map(async (wallet: any) => {
        const walletFinded: any = await prisma.wallet.findUnique({
          where: {
            id: wallet,
          },
        });
        walletFinded.tags.push(req.body.tag);

        await prisma.wallet.update({
          where: {
            id: wallet,
          },
          data: {
            tags: walletFinded.tags,
          },
        });
      })
    );

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
