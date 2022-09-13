import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/react";
import { Contract, Wallet } from "@prisma/client";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });
  const tags: [string?, string?] = [];

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }

  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: session?.user?.id },
    });

    const contracts = await prisma.contract.findMany({
      where: { userId: session?.user?.id },
    });

    if (contracts.length !== 0) {
      contracts.forEach((contract: Contract) => {
        contract.tags.forEach((tag: string) => {
          tags.push(tag);
        });
      });
    }

    if (wallets.length !== 0) {
      wallets.forEach((wallet: Wallet) => {
        wallet.tags.forEach((tag: string) => {
          tags.push(tag);
        });
      });
    }

    const uniqueTags = tags.filter((tag, index) => {
      return tags.indexOf(tag) === index;
    });

    res.status(200).json({
      wallets,
      contracts,
      uniqueTags,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
