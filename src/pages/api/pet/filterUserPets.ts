import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/prisma";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }

  // @ts-ignore
  const page: number = parseInt(req.query.page);
  const startIndex: number = (page - 1) * 10;

  try {
    const filters = Object.fromEntries(
      Object.entries(req.query).filter(([key, value]) => {
        if (key !== "page") {
          return value;
        }
      })
    );
    // @ts-ignore
    filters.adopted = filters.adopted == "true" ? true : false;
    filters.userId = session.user.id;

    if (session.user.role === Role.SHELTER) {
      const pets = await prisma.pet.findMany({
        where: filters,
        skip: startIndex,
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const total = await prisma.pet.count({ where: filters });
      res.status(200).json({ pets, total });
    }

    if (session.user.role === Role.ADOPTER) {
      filters.adopterUserEmail = session.user.email;
      const pets = await prisma.pet.findMany({
        where: filters,
        skip: startIndex,
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const total = await prisma.pet.count({ where: filters });
      res.status(200).json({ pets, total });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
