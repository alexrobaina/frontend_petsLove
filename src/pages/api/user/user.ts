import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  res.json({ data: user });
};
