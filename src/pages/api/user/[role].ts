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

  if (!req.query.role) {
    return res
      .status(404)
      .json({ statusCode: 400, message: "{Please send user role}." });
  }

  const role: any = req.query?.role;

  try {
    const user = await prisma.user.findMany({
      where: { role },
      select: { email: true },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
