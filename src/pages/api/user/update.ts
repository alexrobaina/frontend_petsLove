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
    const user = await prisma.user.update({
      where: { id: session?.user?.id },
      data: req.body,
    });
    session.user.role = req.body.role;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
