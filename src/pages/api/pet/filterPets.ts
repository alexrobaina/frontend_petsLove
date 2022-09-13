import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const page: number = parseInt(req.query.page);
  const startIndex: number = (page - 1) * 10;

  try {
    const filters = Object.fromEntries(
      Object.entries(req.query).filter(([key, value]) => {
        if (key !== "page" && key !== "name") {
          return value;
        }
      })
    );
    // @ts-ignore
    filters.adopted = filters.adopted == "true" ? true : false;

    const name: any = req?.query?.name;
    console.log(name);

    const pets = await prisma.pet.findMany({
      where: { ...filters, name: { contains: name } },
      skip: startIndex,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.pet.count({ where: filters });

    res.status(200).json({ pets, total });
  } catch (error) {
    res.status(500).json({ error });
  }
};
