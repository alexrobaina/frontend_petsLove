import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }

  const adopted = await prisma.pet.count({
    where: { userId: session?.user?.id, adopted: true },
  });

  const adoption = await prisma.pet.count({
    where: { userId: session?.user?.id, adopted: false },
  });

  const cats = await prisma.pet.count({
    where: { userId: session?.user?.id, category: "cat" },
  });

  const dogs = await prisma.pet.count({
    where: { userId: session?.user?.id, category: "dog" },
  });

  const exotics = await prisma.pet.count({
    where: { userId: session?.user?.id, category: "exotics" },
  });

  res.json({ data: { adopted, adoption, cats, dogs, exotics } });
};
